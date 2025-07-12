// src/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7159/api';

// USERS
export const getUsers = async () => (await axios.get(`${API_BASE_URL}/User`)).data;
export const getUserById = async (id: number) => (await axios.get(`${API_BASE_URL}/User/${id}`)).data;
export const createUser = async (user: any) => (await axios.post(`${API_BASE_URL}/User`, user)).data;
export const updateUser = async (id: number, user: any) => (await axios.put(`${API_BASE_URL}/User/${id}`, user)).data;
export const deleteUser = async (id: number) => (await axios.delete(`${API_BASE_URL}/User/${id}`)).data;

// ITEMS
export const getItems = async () => (await axios.get(`${API_BASE_URL}/Item`)).data;
export const getItemById = async (id: number) => (await axios.get(`${API_BASE_URL}/Item/${id}`)).data;
export const createItem = async (item: any) => (await axios.post(`${API_BASE_URL}/Item`, item)).data;
export const updateItem = async (id: number, item: any) => (await axios.put(`${API_BASE_URL}/Item/${id}`, item)).data;
export const deleteItem = async (id: number) => (await axios.delete(`${API_BASE_URL}/Item/${id}`)).data;

// SWAP REQUESTS
export const getSwapRequests = async () => (await axios.get(`${API_BASE_URL}/SwapRequest`)).data;
export const getSwapRequestById = async (id: number) => (await axios.get(`${API_BASE_URL}/SwapRequest/${id}`)).data;
export const createSwapRequest = async (request: any) => (await axios.post(`${API_BASE_URL}/SwapRequest`, request)).data;
export const updateSwapRequest = async (id: number, request: any) => (await axios.put(`${API_BASE_URL}/SwapRequest/${id}`, request)).data;
export const deleteSwapRequest = async (id: number) => (await axios.delete(`${API_BASE_URL}/SwapRequest/${id}`)).data;

// AI RECOMMENDATIONS
export const getRecommendations = async () => (await axios.get(`${API_BASE_URL}/Airecommendation`)).data;
export const getRecommendationById = async (id: number) => (await axios.get(`${API_BASE_URL}/Airecommendation/${id}`)).data;
export const createRecommendation = async (rec: any) => (await axios.post(`${API_BASE_URL}/Airecommendation`, rec)).data;
export const updateRecommendation = async (id: number, rec: any) => (await axios.put(`${API_BASE_URL}/Airecommendation/${id}`, rec)).data;
export const deleteRecommendation = async (id: number) => (await axios.delete(`${API_BASE_URL}/Airecommendation/${id}`)).data;

// NOTIFICATIONS
export const getNotifications = async () => (await axios.get(`${API_BASE_URL}/Notification`)).data;
export const getNotificationById = async (id: number) => (await axios.get(`${API_BASE_URL}/Notification/${id}`)).data;
export const createNotification = async (notification: any) => (await axios.post(`${API_BASE_URL}/Notification`, notification)).data;
export const updateNotification = async (id: number, notification: any) => (await axios.put(`${API_BASE_URL}/Notification/${id}`, notification)).data;
export const deleteNotification = async (id: number) => (await axios.delete(`${API_BASE_URL}/Notification/${id}`)).data;

// BADGES
export const getBadges = async () => (await axios.get(`${API_BASE_URL}/Badge`)).data;
export const getBadgeById = async (id: number) => (await axios.get(`${API_BASE_URL}/Badge/${id}`)).data;
export const createBadge = async (badge: any) => (await axios.post(`${API_BASE_URL}/Badge`, badge)).data;
export const updateBadge = async (id: number, badge: any) => (await axios.put(`${API_BASE_URL}/Badge/${id}`, badge)).data;
export const deleteBadge = async (id: number) => (await axios.delete(`${API_BASE_URL}/Badge/${id}`)).data;
