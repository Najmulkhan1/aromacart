"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Plus, Search, Edit, Trash2, Eye, Loader2, X, Save,
  Package, AlertTriangle, CheckCircle2, ChevronDown
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────
interface SizeVariant { size: string; price: number; }
interface Product {
  _id: string;
  nameEn: string;
  nameBn: string;
  slug: string;
  descriptionEn?: string;
  descriptionBn?: string;
  scentFamily: string;
  regularPrice: number;
  compareAtPrice?: number;
  totalStock: number;
  status: string;
  brand?: string;
  images?: string[];
  sizes?: SizeVariant[];
  scentNotes?: { top?: string; heart?: string; base?: string };
}

// ─── Delete Confirm Modal ─────────────────────────────────
function DeleteModal({
  product,
  onConfirm,
  onCancel,
  loading,
}: {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <h2 className="text-lg font-black">Delete Product?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="font-semibold text-foreground">&ldquo;{product.nameEn}&rdquo;</span> permanently delete হবে। এই কাজ undo করা যাবে না।
            </p>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 h-11 rounded-2xl border-2 border-border font-bold text-sm hover:border-primary/40 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 h-11 rounded-2xl bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Modal ───────────────────────────────────────────
function EditModal({
  product,
  onSave,
  onClose,
  saving,
}: {
  product: Product;
  onSave: (data: Partial<Product>) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    nameEn: product.nameEn,
    nameBn: product.nameBn,
    descriptionEn: product.descriptionEn || "",
    descriptionBn: product.descriptionBn || "",
    regularPrice: String(product.regularPrice),
    compareAtPrice: String(product.compareAtPrice || ""),
    totalStock: String(product.totalStock),
    scentFamily: product.scentFamily,
    brand: product.brand || "AromaCart",
    status: product.status,
    topNotes: product.scentNotes?.top || "",
    heartNotes: product.scentNotes?.heart || "",
    baseNotes: product.scentNotes?.base || "",
    size30: product.sizes?.some(s => s.size === "30ml") || false,
    price30: String(product.sizes?.find(s => s.size === "30ml")?.price || ""),
    size50: product.sizes?.some(s => s.size === "50ml") || false,
    price50: String(product.sizes?.find(s => s.size === "50ml")?.price || ""),
    size100: product.sizes?.some(s => s.size === "100ml") || false,
    price100: String(product.sizes?.find(s => s.size === "100ml")?.price || ""),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sizes: SizeVariant[] = [];
    if (form.size30 && form.price30) sizes.push({ size: "30ml", price: Number(form.price30) });
    if (form.size50 && form.price50) sizes.push({ size: "50ml", price: Number(form.price50) });
    if (form.size100 && form.price100) sizes.push({ size: "100ml", price: Number(form.price100) });

    onSave({
      nameEn: form.nameEn,
      nameBn: form.nameBn,
      descriptionEn: form.descriptionEn,
      descriptionBn: form.descriptionBn,
      regularPrice: Number(form.regularPrice),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
      totalStock: Number(form.totalStock),
      scentFamily: form.scentFamily,
      brand: form.brand,
      status: form.status,
      scentNotes: { top: form.topNotes, heart: form.heartNotes, base: form.baseNotes },
      sizes,
    });
  };

  const inputCls = "w-full h-10 px-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors";
  const labelCls = "text-xs font-bold uppercase tracking-wider text-muted-foreground";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-lg font-black">Edit Product</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{product.nameEn}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Name (English) *</label>
              <input name="nameEn" value={form.nameEn} onChange={handleChange} required className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Name (Bengali) *</label>
              <input name="nameBn" value={form.nameBn} onChange={handleChange} required className={inputCls} />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Description (EN)</label>
              <textarea name="descriptionEn" value={form.descriptionEn} onChange={handleChange} rows={3} className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors resize-none" />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Description (BN)</label>
              <textarea name="descriptionBn" value={form.descriptionBn} onChange={handleChange} rows={3} className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors resize-none" />
            </div>
          </div>

          {/* Price / Stock / Status */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Regular Price *</label>
              <input name="regularPrice" type="number" value={form.regularPrice} onChange={handleChange} required className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Compare Price</label>
              <input name="compareAtPrice" type="number" value={form.compareAtPrice} onChange={handleChange} className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Total Stock *</label>
              <input name="totalStock" type="number" value={form.totalStock} onChange={handleChange} required className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Status</label>
              <div className="relative">
                <select name="status" value={form.status} onChange={handleChange} className={`${inputCls} appearance-none pr-8`}>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Low Stock">Low Stock</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Scent Family + Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Scent Family *</label>
              <div className="relative">
                <select name="scentFamily" value={form.scentFamily} onChange={handleChange} required className={`${inputCls} appearance-none pr-8`}>
                  <option value="">Select...</option>
                  {["Woody","Floral","Oriental","Fresh","Citrus","Spicy"].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Brand</label>
              <input name="brand" value={form.brand} onChange={handleChange} className={inputCls} />
            </div>
          </div>

          {/* Scent Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className={labelCls}>Top Notes</label>
              <input name="topNotes" value={form.topNotes} onChange={handleChange} placeholder="Bergamot, Lemon..." className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Heart Notes</label>
              <input name="heartNotes" value={form.heartNotes} onChange={handleChange} placeholder="Rose, Jasmine..." className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Base Notes</label>
              <input name="baseNotes" value={form.baseNotes} onChange={handleChange} placeholder="Vanilla, Amber..." className={inputCls} />
            </div>
          </div>

          {/* Size Variants */}
          <div className="p-4 bg-secondary/20 rounded-2xl border border-border space-y-3">
            <p className={labelCls}>Size Variants</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {([["size30","price30","30ml"],["size50","price50","50ml"],["size100","price100","100ml"]] as const).map(([sKey, pKey, label]) => (
                <div key={sKey} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={sKey}
                    id={sKey}
                    checked={form[sKey] as boolean}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary shrink-0"
                  />
                  <label htmlFor={sKey} className="text-sm font-medium w-10 shrink-0">{label}</label>
                  <input
                    type="number"
                    name={pKey}
                    value={form[pKey] as string}
                    onChange={handleChange}
                    placeholder="Price"
                    disabled={!form[sKey]}
                    className="flex-1 h-9 px-2 text-sm rounded-lg border border-border bg-background outline-none focus:border-primary disabled:opacity-40 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex gap-3 shrink-0">
          <button type="button" onClick={onClose} className="flex-1 h-11 rounded-2xl border-2 border-border font-bold text-sm hover:border-primary/40 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            form="edit-form"
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 h-11 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function AdminProductsPage() {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Edit modal state
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Delete modal state
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products?status=all");
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to fetch");
      setProducts(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Search filter
  const filtered = products.filter(p =>
    p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nameBn.includes(searchQuery) ||
    p.scentFamily.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Handle Delete ──
  const handleDelete = async () => {
    if (!deleteProduct) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteProduct._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProducts(prev => prev.filter(p => p._id !== deleteProduct._id));
      setDeleteProduct(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // ── Handle Edit Save ──
  const handleEditSave = async (formData: Partial<Product>) => {
    if (!editProduct) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/products/${editProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProducts(prev => prev.map(p => p._id === editProduct._id ? { ...p, ...data.data } : p));
      setEditProduct(null);
      setSaveSuccess("Product updated successfully!");
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // Status color
  const statusColor = (s: string) => {
    if (s === "Active") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    if (s === "Out of Stock") return "bg-rose-500/10 text-rose-600 border-rose-500/20";
    if (s === "Low Stock") return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    return "bg-secondary text-muted-foreground border-border";
  };

  return (
    <div className="space-y-6">

      {/* Modals */}
      {deleteProduct && (
        <DeleteModal
          product={deleteProduct}
          onConfirm={handleDelete}
          onCancel={() => setDeleteProduct(null)}
          loading={deleting}
        />
      )}
      {editProduct && (
        <EditModal
          product={editProduct}
          onSave={handleEditSave}
          onClose={() => setEditProduct(null)}
          saving={saving}
        />
      )}

      {/* Success toast */}
      {saveSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-xl shadow-emerald-500/20 font-semibold text-sm animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4" /> {saveSuccess}
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            Products <Package className="w-7 h-7 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-1">Manage your store&apos;s fragrance inventory.</p>
        </div>
        <Link
          href={`/${currentLocale}/admin/products/new`}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      {/* ── Search ── */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or scent family..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-secondary/30 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* ── States ── */}
      {loading ? (
        <div className="h-60 flex flex-col items-center justify-center text-muted-foreground gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Loading products...</p>
        </div>
      ) : error ? (
        <div className="h-40 flex items-center justify-center text-rose-500 font-medium border border-dashed rounded-2xl bg-rose-500/5">
          Error: {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="h-40 flex flex-col items-center justify-center text-muted-foreground border border-dashed rounded-2xl gap-2">
          <Package className="w-10 h-10 text-muted-foreground/30" />
          <p className="font-medium">No products found.</p>
        </div>
      ) : (
        /* ── Products Table ── */
        <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/20">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">Product</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Scent</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Price</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Stock</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => (
                  <tr key={product._id} className="hover:bg-secondary/10 transition-colors">
                    {/* Product info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt={product.nameEn} className="w-11 h-11 rounded-xl object-cover border border-border shrink-0" />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-secondary/60 flex items-center justify-center shrink-0">
                            <Package className="w-5 h-5 text-muted-foreground/40" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-foreground">{product.nameEn}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{product.nameBn}</p>
                        </div>
                      </div>
                    </td>

                    {/* Scent family */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {product.scentFamily}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <p className="font-bold">৳ {product.regularPrice.toLocaleString()}</p>
                      {product.compareAtPrice && (
                        <p className="text-xs text-muted-foreground line-through">৳ {product.compareAtPrice.toLocaleString()}</p>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">
                      <span className={`font-bold ${product.totalStock === 0 ? "text-rose-500" : product.totalStock < 10 ? "text-amber-500" : "text-foreground"}`}>
                        {product.totalStock} units
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border ${statusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* View in shop */}
                        <Link
                          href={`/${currentLocale}/shop/${product.slug}`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                          title="View in shop"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Edit */}
                        <button
                          onClick={() => setEditProduct(product)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-blue-400 hover:text-blue-500 transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteProduct(product)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-rose-400 hover:text-rose-500 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-bold text-foreground">{filtered.length}</span> of{" "}
              <span className="font-bold text-foreground">{products.length}</span> products
            </p>
          </div>
        </div>
      )}
    </div>
  );
}