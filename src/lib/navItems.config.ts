import { NavSection } from "@/types/dashboard.interface";
import { UserRole } from "./auth-utils";


/**
 * COMMON NAVIGATION (Visible to both USER & ADMIN)
 */
export const getCommonNavItems = (role: UserRole): NavSection[] => {
  

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href:"/dashboard",
                    icon: "LayoutDashboard",
                    roles: ["USER", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: "/profile",
                    icon: "User",
                    roles: ["USER", "ADMIN"],
                },
                {
                    title: "Explore",
                    href: "/explore",
                    icon: "Search",
                    roles: ["USER", "ADMIN"],
                },
            ],
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings",
                    roles: ["USER", "ADMIN"],
                },
            ],
        },
    ];
};

/**
 * USER NAVIGATION
 * These routes match your actual project:
 * - Travel Plans
 * - Add Plan
 */
export const userNavItems: NavSection[] = [
    {
        title: "Travel Plans",
        items: [
            {
                title: "My Travel Plans",
                href: "/travel-plans",
                icon: "Map",
                roles: ["USER"],
            },
            {
                title: "Add New Plan",
                href: "/travel-plans/add",
                icon: "PlusCircle",
                roles: ["USER"],
            },
        ],
    },
];

/**
 * ADMIN NAVIGATION
 * Based on your project description:
 * - Manage Users
 * - Manage Travel Plans
 * - Manage Activities
 */
export const adminNavItems: NavSection[] = [
    {
        title: "Management",
        items: [
            {
                title: "Users",
                href: "/admin/users",
                icon: "Users",
                roles: ["ADMIN"],
            },
            {
                title: "Travel Plans",
                href: "/admin/travel-plans",
                icon: "Map",
                roles: ["ADMIN"],
            },
            {
                title: "Activities",
                href: "/admin/activities",
                icon: "ListChecks",
                roles: ["ADMIN"],
            },
        ],
    },
];

/**
 * MAIN ROLE-BASED NAVIGATION BUILDER
 */
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const common = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...common, ...adminNavItems];

        case "USER":
            return [...common, ...userNavItems];

        default:
            return [];
    }
};
