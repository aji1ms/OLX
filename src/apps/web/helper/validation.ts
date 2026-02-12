export const validateName = (name: string): string | null => {
    if (!name || name.length < 3) return "Name must be at least 3 characters";
    return null;
};

export const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^[0-9]{10}$/; 
    if (!phoneRegex.test(phone)) return "Enter a valid 10-digit phone number";
    return null;
};

export const validateEmail = (email: string): string | null => {
    if (!email) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";

    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!complexityRegex.test(password)) {
        return "Password must contain an uppercase letter, a lowercase letter, and a number";
    }

    return null;
};