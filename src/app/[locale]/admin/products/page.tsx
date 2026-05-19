"use client";

import Link from "next/link";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
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

// ডেমো প্রোডাক্ট ডাটা
const products = [
  { id: "PRD-001", name: "Oud Wood Intense", category: "Woody", price: 12500, stock: 45, status: "Active" },
  { id: "PRD-002", name: "Rose Noir", category: "Floral", price: 8900, stock: 12, status: "Active" },
  { id: "PRD-003", name: "Citrus Grove", category: "Citrus", price: 6500, stock: 0, status: "Out of Stock" },
  { id: "PRD-004", name: "Midnight Amber", category: "Oriental", price: 10200, stock: 8, status: "Low Stock" },
  { id: "PRD-005", name: "Ocean Breeze", category: "Fresh", price: 5500, stock: 120, status: "Active" },
  { id: "PRD-006", name: "Spiced Vanilla", category: "Spicy", price: 7800, stock: 0, status: "Draft" },
];

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your store's fragrance inventory.</p>
        </div>
        <Button className="rounded-xl h-11 px-6">
          <Plus className="w-4 h-4 mr-2" /> Add New Product
        </Button>
      </div>

      {/* Top Action Bar: Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-9 h-10 rounded-lg bg-secondary/50 border-transparent focus-visible:border-primary"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-lg">Category</Button>
          <Button variant="outline" className="h-10 rounded-lg">Status</Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                {/* Image Placeholder */}
                <TableCell>
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                    Img
                  </div>
                </TableCell>
                
                {/* Product Name & ID */}
                <TableCell>
                  <div className="font-medium text-foreground">{product.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{product.id}</div>
                </TableCell>
                
                {/* Category */}
                <TableCell>
                  <Badge variant="outline" className="bg-secondary/50 font-normal">
                    {product.category}
                  </Badge>
                </TableCell>
                
                {/* Price */}
                <TableCell className="font-medium">
                  ৳ {product.price.toLocaleString()}
                </TableCell>
                
                {/* Stock */}
                <TableCell>
                  <span className={product.stock === 0 ? "text-destructive font-medium" : ""}>
                    {product.stock} {product.stock > 0 ? "in stock" : ""}
                  </span>
                </TableCell>
                
                {/* Status */}
                <TableCell>
                  <Badge 
                    className={`font-normal ${
                      product.status === "Active" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" :
                      product.status === "Out of Stock" ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" :
                      product.status === "Low Stock" ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20" :
                      "bg-secondary text-muted-foreground hover:bg-secondary"
                    }`}
                    variant="secondary"
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                
                {/* Actions Dropdown */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="w-4 h-4 mr-2 text-muted-foreground" /> View in Shop
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="w-4 h-4 mr-2 text-muted-foreground" /> Edit Product
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Simple Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>6</strong> of <strong>24</strong> products
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}