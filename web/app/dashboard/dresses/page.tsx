"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter, Edit, Trash2 } from "lucide-react";
import { DashboardContainer } from "@/components/ui/dashboard-container";

// Mock data
const mockDresses = [
  {
    id: "D001",
    name: "Elegant Evening Gown",
    description: "A beautiful black evening gown perfect for formal events.",
    category: "evening",
    price: 125,
    available: true,
    image: "https://placehold.co/300x400/black/white?text=Evening+Gown",
    size: "M",
    color: "Black",
    rentalDuration: {
      min: 1,
      max: 7,
    },
  },
  {
    id: "D002",
    name: "Vintage Wedding Dress",
    description: "A classic white wedding dress with vintage details.",
    category: "wedding",
    price: 350,
    available: true,
    image: "https://placehold.co/300x400/white/black?text=Wedding+Dress",
    size: "S",
    color: "White",
    rentalDuration: {
      min: 1,
      max: 3,
    },
  },
  {
    id: "D003",
    name: "Cocktail Party Dress",
    description: "A stylish red cocktail dress for parties and events.",
    category: "cocktail",
    price: 90,
    available: true,
    image: "https://placehold.co/300x400/red/white?text=Cocktail+Dress",
    size: "L",
    color: "Red",
    rentalDuration: {
      min: 1,
      max: 5,
    },
  },
  {
    id: "D004",
    name: "Summer Gala Dress",
    description: "A light blue dress perfect for summer galas and events.",
    category: "gala",
    price: 110,
    available: false,
    image: "https://placehold.co/300x400/lightblue/black?text=Gala+Dress",
    size: "M",
    color: "Light Blue",
    rentalDuration: {
      min: 1,
      max: 4,
    },
  },
  {
    id: "D005",
    name: "Prom Night Special",
    description: "A sparkly purple dress designed for prom nights.",
    category: "prom",
    price: 100,
    available: true,
    image: "https://placehold.co/300x400/purple/white?text=Prom+Dress",
    size: "S",
    color: "Purple",
    rentalDuration: {
      min: 1,
      max: 2,
    },
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "evening", label: "Evening Gowns" },
  { value: "wedding", label: "Wedding Dresses" },
  { value: "cocktail", label: "Cocktail Dresses" },
  { value: "gala", label: "Gala Dresses" },
  { value: "prom", label: "Prom Dresses" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function DressesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(null);
  const [isAddDressOpen, setIsAddDressOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [newDress, setNewDress] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    size: "",
    color: "",
    available: true,
    minDuration: "1",
    maxDuration: "7",
    image: "",
  });

  // Filter dresses based on search term, category, and availability
  const filteredDresses = mockDresses.filter((dress) => {
    const matchesSearch =
      dress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dress.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dress.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || dress.category === categoryFilter;

    const matchesAvailability =
      availabilityFilter === null || dress.available === availabilityFilter;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleAddDress = () => {
    // In a real app, you would add the dress to the database
    console.log("Adding dress:", newDress);
    setIsAddDressOpen(false);
    setNewDress({
      name: "",
      description: "",
      category: "",
      price: "",
      size: "",
      color: "",
      available: true,
      minDuration: "1",
      maxDuration: "7",
      image: "",
    });
  };

  return (
    <DashboardContainer>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dresses</h2>
          <p className="text-muted-foreground">
            Manage your dress inventory
          </p>
        </div>
        <Dialog open={isAddDressOpen} onOpenChange={setIsAddDressOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Dress
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Dress</DialogTitle>
              <DialogDescription>
                Enter the details of the new dress to add to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Dress Name</Label>
                  <Input
                    id="name"
                    value={newDress.name}
                    onChange={(e) =>
                      setNewDress({ ...newDress, name: e.target.value })
                    }
                    placeholder="Elegant Evening Gown"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newDress.category}
                    onValueChange={(value) =>
                      setNewDress({ ...newDress, category: value })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((cat) => cat.value !== "all")
                        .map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDress.description}
                  onChange={(e) =>
                    setNewDress({ ...newDress, description: e.target.value })
                  }
                  placeholder="A beautiful dress perfect for formal events."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($/day)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newDress.price}
                    onChange={(e) =>
                      setNewDress({ ...newDress, price: e.target.value })
                    }
                    placeholder="100"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="size">Size</Label>
                  <Select
                    value={newDress.size}
                    onValueChange={(value) =>
                      setNewDress({ ...newDress, size: value })
                    }
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={newDress.color}
                    onChange={(e) =>
                      setNewDress({ ...newDress, color: e.target.value })
                    }
                    placeholder="Black"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="minDuration">Min. Rental Days</Label>
                  <Input
                    id="minDuration"
                    type="number"
                    value={newDress.minDuration}
                    onChange={(e) =>
                      setNewDress({ ...newDress, minDuration: e.target.value })
                    }
                    min="1"
                    max="30"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxDuration">Max. Rental Days</Label>
                  <Input
                    id="maxDuration"
                    type="number"
                    value={newDress.maxDuration}
                    onChange={(e) =>
                      setNewDress({ ...newDress, maxDuration: e.target.value })
                    }
                    min="1"
                    max="30"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newDress.image}
                    onChange={(e) =>
                      setNewDress({ ...newDress, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={newDress.available}
                  onCheckedChange={(checked) =>
                    setNewDress({ ...newDress, available: checked })
                  }
                />
                <Label htmlFor="available">Available for booking</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDressOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDress}>Add Dress</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dress Inventory</CardTitle>
          <CardDescription>
            Manage your dress collection and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search dresses..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="availability">Availability:</Label>
                <Select
                  value={availabilityFilter === null ? "all" : availabilityFilter ? "available" : "unavailable"}
                  onValueChange={(value) => {
                    if (value === "all") setAvailabilityFilter(null);
                    else if (value === "available") setAvailabilityFilter(true);
                    else setAvailabilityFilter(false);
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  Table
                </Button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDresses.map((dress) => (
                <Card key={dress.id} className="overflow-hidden">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={dress.image}
                      alt={dress.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={dress.available ? "default" : "destructive"}
                      >
                        {dress.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{dress.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {dress.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline">{dress.category}</Badge>
                      <span className="font-bold">${dress.price}/day</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>Size: {dress.size}</span>
                      <span>Color: {dress.color}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {filteredDresses.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No dresses found.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Price/Day</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDresses.map((dress) => (
                    <TableRow key={dress.id}>
                      <TableCell className="font-medium">{dress.id}</TableCell>
                      <TableCell>{dress.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{dress.category}</Badge>
                      </TableCell>
                      <TableCell>{dress.size}</TableCell>
                      <TableCell>${dress.price}</TableCell>
                      <TableCell>
                        <Badge
                          variant={dress.available ? "default" : "destructive"}
                        >
                          {dress.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredDresses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No dresses found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardContainer>
  );
} 