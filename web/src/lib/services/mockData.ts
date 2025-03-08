import type { Customer, Dress, Booking, RecentActivity, DashboardStats, User } from '$lib/types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@luxurious.com',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Staff User',
    email: 'staff@luxurious.com',
    role: 'staff',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z'
  }
];

// Mock Customers
export const customers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    notes: 'Prefers evening appointments',
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Park Ave, New York, NY 10022',
    notes: 'Allergic to certain fabrics',
    createdAt: '2023-02-10T00:00:00.000Z',
    updatedAt: '2023-02-10T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Jessica Williams',
    email: 'jessica.williams@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Broadway, New York, NY 10003',
    createdAt: '2023-03-05T00:00:00.000Z',
    updatedAt: '2023-03-05T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    phone: '+1 (555) 234-5678',
    address: '321 5th Ave, New York, NY 10016',
    notes: 'VIP customer',
    createdAt: '2023-03-20T00:00:00.000Z',
    updatedAt: '2023-03-20T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Sophia Miller',
    email: 'sophia.miller@example.com',
    phone: '+1 (555) 876-5432',
    address: '654 Madison Ave, New York, NY 10065',
    createdAt: '2023-04-12T00:00:00.000Z',
    updatedAt: '2023-04-12T00:00:00.000Z'
  }
];

// Mock Dresses
export const dresses: Dress[] = [
  {
    id: '1',
    name: 'Elegant Evening Gown',
    description: 'A stunning floor-length gown with intricate beadwork and a flowing train.',
    category: 'Evening',
    size: 'M',
    color: 'Navy Blue',
    price: 2500,
    rentalPrice: 350,
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    isAvailable: true,
    createdAt: '2023-01-10T00:00:00.000Z',
    updatedAt: '2023-01-10T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Classic Bridal Gown',
    description: 'A timeless white wedding dress with lace details and a sweetheart neckline.',
    category: 'Bridal',
    size: 'S',
    color: 'White',
    price: 3500,
    rentalPrice: 500,
    imageUrl: 'https://images.unsplash.com/photo-1594552072238-5c4a26f2239b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    isAvailable: true,
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Cocktail Party Dress',
    description: 'A chic knee-length dress perfect for cocktail parties and semi-formal events.',
    category: 'Cocktail',
    size: 'L',
    color: 'Black',
    price: 1200,
    rentalPrice: 180,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=783&q=80',
    isAvailable: true,
    createdAt: '2023-02-05T00:00:00.000Z',
    updatedAt: '2023-02-05T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Sequined Gala Dress',
    description: 'A glamorous sequined dress that catches the light with every movement.',
    category: 'Gala',
    size: 'M',
    color: 'Gold',
    price: 2800,
    rentalPrice: 400,
    imageUrl: 'https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    isAvailable: false,
    createdAt: '2023-02-20T00:00:00.000Z',
    updatedAt: '2023-02-20T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Summer Garden Party Dress',
    description: 'A light and airy floral dress perfect for outdoor summer events.',
    category: 'Casual',
    size: 'S',
    color: 'Floral Print',
    price: 950,
    rentalPrice: 120,
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=734&q=80',
    isAvailable: true,
    createdAt: '2023-03-10T00:00:00.000Z',
    updatedAt: '2023-03-10T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'Red Carpet Gown',
    description: 'A show-stopping red gown with a dramatic silhouette and train.',
    category: 'Evening',
    size: 'L',
    color: 'Red',
    price: 3200,
    rentalPrice: 450,
    imageUrl: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    isAvailable: true,
    createdAt: '2023-03-25T00:00:00.000Z',
    updatedAt: '2023-03-25T00:00:00.000Z'
  }
];

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    dressId: '1',
    startDate: '2023-05-15T00:00:00.000Z',
    endDate: '2023-05-18T00:00:00.000Z',
    status: 'confirmed',
    totalPrice: 1050,
    notes: 'For charity gala',
    createdAt: '2023-04-20T00:00:00.000Z',
    updatedAt: '2023-04-20T00:00:00.000Z'
  },
  {
    id: '2',
    customerId: '2',
    dressId: '2',
    startDate: '2023-06-10T00:00:00.000Z',
    endDate: '2023-06-12T00:00:00.000Z',
    status: 'pending',
    totalPrice: 1000,
    createdAt: '2023-04-25T00:00:00.000Z',
    updatedAt: '2023-04-25T00:00:00.000Z'
  },
  {
    id: '3',
    customerId: '3',
    dressId: '3',
    startDate: '2023-05-05T00:00:00.000Z',
    endDate: '2023-05-07T00:00:00.000Z',
    status: 'completed',
    totalPrice: 360,
    notes: 'Corporate event',
    createdAt: '2023-04-10T00:00:00.000Z',
    updatedAt: '2023-05-08T00:00:00.000Z'
  },
  {
    id: '4',
    customerId: '4',
    dressId: '4',
    startDate: '2023-05-20T00:00:00.000Z',
    endDate: '2023-05-23T00:00:00.000Z',
    status: 'confirmed',
    totalPrice: 1200,
    notes: 'Award ceremony',
    createdAt: '2023-04-30T00:00:00.000Z',
    updatedAt: '2023-04-30T00:00:00.000Z'
  },
  {
    id: '5',
    customerId: '5',
    dressId: '5',
    startDate: '2023-06-01T00:00:00.000Z',
    endDate: '2023-06-03T00:00:00.000Z',
    status: 'cancelled',
    totalPrice: 240,
    notes: 'Cancelled due to scheduling conflict',
    createdAt: '2023-05-01T00:00:00.000Z',
    updatedAt: '2023-05-10T00:00:00.000Z'
  },
  {
    id: '6',
    customerId: '1',
    dressId: '6',
    startDate: '2023-06-15T00:00:00.000Z',
    endDate: '2023-06-18T00:00:00.000Z',
    status: 'pending',
    totalPrice: 1350,
    notes: 'Wedding guest',
    createdAt: '2023-05-12T00:00:00.000Z',
    updatedAt: '2023-05-12T00:00:00.000Z'
  }
];

// Mock Recent Activities
export const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'booking',
    action: 'created',
    entityId: '6',
    entityName: 'Booking #6',
    timestamp: '2023-05-12T10:30:00.000Z',
    performedBy: 'Admin User'
  },
  {
    id: '2',
    type: 'booking',
    action: 'updated',
    entityId: '5',
    entityName: 'Booking #5',
    timestamp: '2023-05-10T14:45:00.000Z',
    performedBy: 'Staff User'
  },
  {
    id: '3',
    type: 'customer',
    action: 'created',
    entityId: '5',
    entityName: 'Sophia Miller',
    timestamp: '2023-04-12T09:15:00.000Z',
    performedBy: 'Admin User'
  },
  {
    id: '4',
    type: 'dress',
    action: 'updated',
    entityId: '4',
    entityName: 'Sequined Gala Dress',
    timestamp: '2023-04-05T11:20:00.000Z',
    performedBy: 'Admin User'
  },
  {
    id: '5',
    type: 'booking',
    action: 'created',
    entityId: '4',
    entityName: 'Booking #4',
    timestamp: '2023-04-30T16:10:00.000Z',
    performedBy: 'Staff User'
  }
];

// Mock Dashboard Stats
export const dashboardStats: DashboardStats = {
  activeBookings: 3,
  totalRevenue: 3850,
  availableDresses: 5,
  totalCustomers: 5
}; 