// utils/auth.js
export const getAuthenticatedUser = () => {
    try {
        const userData = localStorage.getItem("userData");
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        
        if (!userData || !isAuthenticated || isAuthenticated !== "true") {
            return null;
        }
        
        const user = JSON.parse(userData);
        
        // Check if token exists and is valid format
        if (!user.token || !user.id) {
            clearAuthData();
            return null;
        }
        
        return user;
    } catch (error) {
        console.error("Error getting authenticated user:", error);
        clearAuthData();
        return null;
    }
};

export const getUserId = () => {
    const user = getAuthenticatedUser();
    return user ? user.id : null;
};

export const getAuthToken = () => {
    const user = getAuthenticatedUser();
    return user ? user.token : null;
};

export const isUserAuthenticated = () => {
    return getAuthenticatedUser() !== null;
};

export const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    localStorage.removeItem("isAuthenticated");
    
    // Dispatch logout event
    window.dispatchEvent(new CustomEvent('userLogout'));
};

export const logout = () => {
    clearAuthData();
    // Redirect to login page
    window.location.href = '/login';
};

// Check if token is expired (basic check)
export const isTokenExpired = (token) => {
    if (!token) return true;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        return payload.exp < currentTime;
    } catch (error) {
        return true;
    }
};

// Get authorization headers for API calls
export const getAuthHeaders = () => {
    const token = getAuthToken();
    
    if (!token) {
        return {};
    }
    
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

// Validate authentication on app start
export const validateAuthOnStart = () => {
    const user = getAuthenticatedUser();
    
    if (!user) {
        return false;
    }
    
    // Check if token is expired
    if (isTokenExpired(user.token)) {
        clearAuthData();
        return false;
    }
    
    return true;
};