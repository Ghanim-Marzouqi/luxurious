import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import type { BookingStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

// Format date to display in UI
export function formatDate(date: string | Date): string {
	const d = new Date(date);
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

// Format currency
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(amount);
}

// Get status color based on booking status
export function getStatusColor(status: BookingStatus): string {
	switch (status) {
		case 'pending':
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
		case 'confirmed':
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
		case 'completed':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
		case 'cancelled':
			return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
		default:
			return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
	}
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + '...';
}

// Generate random ID (for demo purposes)
export function generateId(): string {
	return Math.random().toString(36).substring(2, 15);
}

// Validate email format
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Check if user has permission based on role
export function hasPermission(userRole: string, requiredRole: string): boolean {
	if (userRole === 'admin') return true;
	return userRole === requiredRole;
}

// Calculate date difference in days
export function dateDiffInDays(startDate: Date | string, endDate: Date | string): number {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffTime = Math.abs(end.getTime() - start.getTime());
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Calculate rental price based on days and daily rate
export function calculateRentalPrice(dailyRate: number, startDate: Date | string, endDate: Date | string): number {
	const days = dateDiffInDays(startDate, endDate);
	return dailyRate * days;
}

// Format date range for display
export function formatDateRange(startDate: Date | string, endDate: Date | string): string {
	return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

// Get initials from name
export function getInitials(name: string): string {
	return name
		.split(' ')
		.map(part => part.charAt(0))
		.join('')
		.toUpperCase();
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	
	return function(...args: Parameters<T>) {
		const later = () => {
			timeout = null;
			func(...args);
		};
		
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		
		timeout = setTimeout(later, wait);
	};
}