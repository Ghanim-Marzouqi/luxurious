import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { LanguageOption } from '$lib/types';

// Available languages
export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
];

// Get initial language from localStorage or default to English
const initialLang = browser && localStorage.getItem('language') 
  ? languages.find(lang => lang.code === localStorage.getItem('language')) || languages[0]
  : languages[0];

// Create language store
export const language = writable<LanguageOption>(initialLang);

// Update document direction when language changes
language.subscribe(lang => {
  if (browser) {
    localStorage.setItem('language', lang.code);
    document.documentElement.setAttribute('dir', lang.dir);
    document.documentElement.setAttribute('lang', lang.code);
  }
});

// Define translation types
type NestedTranslations = {
  [key: string]: string | NestedTranslations;
};

type TranslationDictionary = {
  [lang: string]: NestedTranslations;
};

// Translations
const translations: TranslationDictionary = {
  en: {
    // Common
    appName: 'The LUXURIOUS',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    actions: 'Actions',
    status: 'Status',
    
    // Auth
    login: 'Login',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    resetPassword: 'Reset Password',
    sendResetLink: 'Send Reset Link',
    
    // Navigation
    dashboard: 'Dashboard',
    customers: 'Customers',
    bookings: 'Bookings',
    dresses: 'Dresses',
    settings: 'Settings',
    
    // Dashboard
    overview: 'Overview',
    activeBookings: 'Active Bookings',
    totalRevenue: 'Total Revenue',
    availableDresses: 'Available Dresses',
    totalCustomers: 'Total Customers',
    recentActivity: 'Recent Activity',
    upcomingBookings: 'Upcoming Bookings',
    
    // Customers
    customersList: 'Customers List',
    addCustomer: 'Add Customer',
    editCustomer: 'Edit Customer',
    customerDetails: 'Customer Details',
    name: 'Name',
    phone: 'Phone',
    address: 'Address',
    notes: 'Notes',
    bookingHistory: 'Booking History',
    
    // Bookings
    bookingsList: 'Bookings List',
    addBooking: 'Add Booking',
    editBooking: 'Edit Booking',
    bookingDetails: 'Booking Details',
    customer: 'Customer',
    dress: 'Dress',
    startDate: 'Start Date',
    endDate: 'End Date',
    totalPrice: 'Total Price',
    bookingStatus: {
      pending: 'Pending',
      confirmed: 'Confirmed',
      completed: 'Completed',
      cancelled: 'Cancelled'
    },
    
    // Dresses
    dressesList: 'Dresses List',
    addDress: 'Add Dress',
    editDress: 'Edit Dress',
    dressDetails: 'Dress Details',
    description: 'Description',
    category: 'Category',
    size: 'Size',
    color: 'Color',
    price: 'Price',
    rentalPrice: 'Rental Price',
    availability: 'Availability',
    available: 'Available',
    unavailable: 'Unavailable',
    
    // Settings
    userManagement: 'User Management',
    users: 'Users',
    addUser: 'Add User',
    editUser: 'Edit User',
    role: 'Role',
    roles: {
      admin: 'Admin',
      staff: 'Staff'
    },
    businessInfo: 'Business Information',
    systemSettings: 'System Settings',
    language: 'Language',
    
    // Validation
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    passwordLength: 'Password must be at least 8 characters',
    passwordsDoNotMatch: 'Passwords do not match',
    
    // Errors
    somethingWentWrong: 'Something went wrong',
    pageNotFound: 'Page not found',
    unauthorized: 'Unauthorized access',
    sessionExpired: 'Your session has expired, please login again',
    
    // Login page
    loginToYourAccount: 'Login to your account',
    enterYourCredentials: 'Enter your credentials to continue',
    loginSuccessful: 'Login successful',
    demoCredentials: 'Demo credentials',
    allRightsReserved: 'All rights reserved',
    profile: 'Profile',
    recentActivityDescription: 'Recent activities in the system',
    upcomingBookingsDescription: 'Upcoming bookings in the next few days',
    noRecentActivity: 'No recent activity',
    noUpcomingBookings: 'No upcoming bookings',
    unknownCustomer: 'Unknown Customer',
    unknownDress: 'Unknown Dress',
    by: 'by',
    created: 'created',
    updated: 'updated',
    deleted: 'deleted',
    appDescription: 'Luxury dress rental management system for The LUXURIOUS',
    noCustomersFound: 'No customers found',
    refreshList: 'Refresh List',
    view: 'View',
    createdAt: 'Created At',
    noDressesFound: 'No dresses found',
    noBookingsFound: 'No bookings found',
    dateRange: 'Date Range',
    businessInfoDescription: 'Manage your business information',
    userManagementDescription: 'Manage users and their roles',
    systemSettingsDescription: 'Configure system settings',
    businessName: 'Business Name',
    businessInfoSaved: 'Business information saved successfully',
    languageChanged: 'Language changed successfully',
    selectLanguage: 'Select Language',
    comingSoon: 'Coming Soon',
    resetYourPassword: 'Reset your password',
    checkYourEmail: 'Check your email',
    enterYourEmail: 'Enter your email address to reset your password',
    resetLinkSent: 'Reset link sent',
    resetLinkSentDescription: 'We have sent a password reset link to your email',
    resetLinkSentLong: 'We have sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.',
    backToLogin: 'Back to Login',
    rememberPassword: 'Remember your password?',
    
    // Profile page
    manageYourProfile: 'Manage your profile settings and preferences',
    profileInformation: 'Profile Information',
    updateYourProfileDetails: 'Update your profile details',
    changePassword: 'Change Password',
    updateYourPassword: 'Update your password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    emailCannotBeChanged: 'Email address cannot be changed',
    profileUpdated: 'Profile updated successfully',
    passwordChanged: 'Password changed successfully',
  },
  ar: {
    // Common
    appName: 'ذا لاكشوريوس',
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    create: 'إنشاء',
    search: 'بحث',
    filter: 'تصفية',
    actions: 'إجراءات',
    status: 'الحالة',
    
    // Auth
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    resetPassword: 'إعادة تعيين كلمة المرور',
    sendResetLink: 'إرسال رابط إعادة التعيين',
    
    // Navigation
    dashboard: 'لوحة التحكم',
    customers: 'العملاء',
    bookings: 'الحجوزات',
    dresses: 'الفساتين',
    settings: 'الإعدادات',
    
    // Dashboard
    overview: 'نظرة عامة',
    activeBookings: 'الحجوزات النشطة',
    totalRevenue: 'إجمالي الإيرادات',
    availableDresses: 'الفساتين المتاحة',
    totalCustomers: 'إجمالي العملاء',
    recentActivity: 'النشاط الأخير',
    upcomingBookings: 'الحجوزات القادمة',
    
    // Customers
    customersList: 'قائمة العملاء',
    addCustomer: 'إضافة عميل',
    editCustomer: 'تعديل العميل',
    customerDetails: 'تفاصيل العميل',
    name: 'الاسم',
    phone: 'الهاتف',
    address: 'العنوان',
    notes: 'ملاحظات',
    bookingHistory: 'سجل الحجوزات',
    
    // Bookings
    bookingsList: 'قائمة الحجوزات',
    addBooking: 'إضافة حجز',
    editBooking: 'تعديل الحجز',
    bookingDetails: 'تفاصيل الحجز',
    customer: 'العميل',
    dress: 'الفستان',
    startDate: 'تاريخ البدء',
    endDate: 'تاريخ الانتهاء',
    totalPrice: 'السعر الإجمالي',
    bookingStatus: {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      completed: 'مكتمل',
      cancelled: 'ملغي'
    },
    
    // Dresses
    dressesList: 'قائمة الفساتين',
    addDress: 'إضافة فستان',
    editDress: 'تعديل الفستان',
    dressDetails: 'تفاصيل الفستان',
    description: 'الوصف',
    category: 'الفئة',
    size: 'المقاس',
    color: 'اللون',
    price: 'السعر',
    rentalPrice: 'سعر الإيجار',
    availability: 'التوفر',
    available: 'متاح',
    unavailable: 'غير متاح',
    
    // Settings
    userManagement: 'إدارة المستخدمين',
    users: 'المستخدمين',
    addUser: 'إضافة مستخدم',
    editUser: 'تعديل المستخدم',
    role: 'الدور',
    roles: {
      admin: 'مدير',
      staff: 'موظف'
    },
    businessInfo: 'معلومات العمل',
    systemSettings: 'إعدادات النظام',
    language: 'اللغة',
    
    // Validation
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صالح',
    passwordLength: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
    passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
    
    // Errors
    somethingWentWrong: 'حدث خطأ ما',
    pageNotFound: 'الصفحة غير موجودة',
    unauthorized: 'وصول غير مصرح به',
    sessionExpired: 'انتهت جلستك، يرجى تسجيل الدخول مرة أخرى',
    
    // Login page
    loginToYourAccount: 'تسجيل الدخول إلى حسابك',
    enterYourCredentials: 'أدخل بيانات الاعتماد الخاصة بك للمتابعة',
    loginSuccessful: 'تم تسجيل الدخول بنجاح',
    demoCredentials: 'بيانات اعتماد تجريبية',
    allRightsReserved: 'جميع الحقوق محفوظة',
    profile: 'الملف الشخصي',
    recentActivityDescription: 'الأنشطة الأخيرة في النظام',
    upcomingBookingsDescription: 'الحجوزات القادمة في الأيام القليلة القادمة',
    noRecentActivity: 'لا يوجد نشاط حديث',
    noUpcomingBookings: 'لا توجد حجوزات قادمة',
    unknownCustomer: 'عميل غير معروف',
    unknownDress: 'فستان غير معروف',
    by: 'بواسطة',
    created: 'تم إنشاؤه',
    updated: 'تم تحديثه',
    deleted: 'تم حذفه',
    appDescription: 'نظام إدارة تأجير الفساتين الفاخرة لـ ذا لاكشوريوس',
    noCustomersFound: 'لم يتم العثور على عملاء',
    refreshList: 'تحديث القائمة',
    view: 'عرض',
    createdAt: 'تاريخ الإنشاء',
    noDressesFound: 'لم يتم العثور على فساتين',
    noBookingsFound: 'لم يتم العثور على حجوزات',
    dateRange: 'نطاق التاريخ',
    businessInfoDescription: 'إدارة معلومات عملك',
    userManagementDescription: 'إدارة المستخدمين وأدوارهم',
    systemSettingsDescription: 'تكوين إعدادات النظام',
    businessName: 'اسم العمل',
    businessInfoSaved: 'تم حفظ معلومات العمل بنجاح',
    languageChanged: 'تم تغيير اللغة بنجاح',
    selectLanguage: 'اختر اللغة',
    comingSoon: 'قريبا',
    resetYourPassword: 'إعادة تعيين كلمة المرور',
    checkYourEmail: 'تحقق من بريدك الإلكتروني',
    enterYourEmail: 'أدخل عنوان بريدك الإلكتروني لإعادة تعيين كلمة المرور',
    resetLinkSent: 'تم إرسال رابط إعادة التعيين',
    resetLinkSentDescription: 'لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
    resetLinkSentLong: 'لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك واتباع التعليمات لإعادة تعيين كلمة المرور.',
    backToLogin: 'العودة إلى تسجيل الدخول',
    rememberPassword: 'هل تتذكر كلمة المرور؟',
    
    // Profile page
    manageYourProfile: 'إدارة إعدادات وتفضيلات ملفك الشخصي',
    profileInformation: 'معلومات الملف الشخصي',
    updateYourProfileDetails: 'تحديث تفاصيل ملفك الشخصي',
    changePassword: 'تغيير كلمة المرور',
    updateYourPassword: 'تحديث كلمة المرور الخاصة بك',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    emailCannotBeChanged: 'لا يمكن تغيير عنوان البريد الإلكتروني',
    profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
    passwordChanged: 'تم تغيير كلمة المرور بنجاح',
  }
};

// Helper function to get nested translation
function getNestedTranslation(obj: NestedTranslations, keys: string[]): string {
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key] as NestedTranslations;
    } else {
      return '';
    }
  }
  
  return current as unknown as string;
}

// Create a derived store for translations
export const t = derived(
  language,
  ($language) => {
    const lang = $language.code;
    
    return (key: string): string => {
      // Split the key by dots to access nested properties
      const keys = key.split('.');
      const langTranslations = translations[lang] || translations.en;
      
      // Try to get translation from current language
      const translation = getNestedTranslation(langTranslations, keys);
      
      if (translation) {
        return translation;
      }
      
      // Fallback to English if translation not found
      const fallbackTranslation = getNestedTranslation(translations.en, keys);
      
      return fallbackTranslation || key;
    };
  }
); 