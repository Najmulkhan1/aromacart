"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Product {
  _id: string;
  nameEn: string;
  nameBn: string;
  scentFamily: string;
  regularPrice: number;
  totalStock: number;
  status: string;
}

export default function AdminProductsPage() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  // স্টেট ম্যানেজমেন্ট
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ডাটাবেস থেকে প্রোডাক্ট নিয়ে আসার ফাংশন
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // আমরা আমাদের তৈরি করা API কল করছি (সব প্রোডাক্টের জন্য status=all প্যারামিটার পাঠিয়ে)
        const response = await fetch("/api/products?status=all");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch products");
        }

        setProducts(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your store&apos;s fragrance inventory.</p>
        </div>
        <Button className="rounded-xl h-11 px-6" asChild>
          <Link href={`/${currentLocale}/admin/products/new`}>
            <Plus className="w-4 h-4 mr-2" /> Add New Product
          </Link>
        </Button>
      </div>

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9 h-10 rounded-lg bg-secondary/50 border-transparent focus-visible:border-primary"
          />
        </div>
      </div>

      {/* Loading & Error States */}
      {loading ? (
        <div className="h-60 flex flex-col items-center justify-center text-muted-foreground gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Loading inventory from database...</p>
        </div>
      ) : error ? (
        <div className="h-40 flex items-center justify-center text-destructive font-medium border border-dashed rounded-2xl bg-destructive/5">
          Error: {error}
        </div>
      ) : products.length === 0 ? (
        <div className="h-40 flex flex-col items-center justify-center text-muted-foreground border border-dashed rounded-2xl">
          <p className="font-medium">No products found in database.</p>
          <p className="text-sm mt-1">Click &quot;Add New Product&quot; to stock your store.</p>
        </div>
      ) : (
        /* Data Table */
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product Name (EN / BN)</TableHead>
                <TableHead>Scent Family</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  {/* Image Placeholder */}
                  <TableCell>
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                      Perfume
                    </div>
                  </TableCell>

                  {/* Product Name (Bilingual) */}
                  <TableCell>
                    <div className="font-medium text-foreground">{product.nameEn}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{product.nameBn}</div>
                  </TableCell>

                  {/* Scent Family */}
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary/50 font-normal">
                      {product.scentFamily}
                    </Badge>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="font-medium">
                    ৳ {product.regularPrice.toLocaleString()}
                  </TableCell>

                  {/* Stock */}
                  <TableCell>
                    <span className={product.totalStock === 0 ? "text-destructive font-medium" : ""}>
                      {product.totalStock} {product.totalStock > 0 ? "units" : "Out of Stock"}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      className={`font-normal ${product.status === "Active" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" :
                          product.status === "Out of Stock" ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" :
                            "bg-secondary text-muted-foreground"
                        }`}
                      variant="secondary"
                    >
                      {product.status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2 text-muted-foreground" /> View Shop
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="w-4 h-4 mr-2 text-muted-foreground" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}