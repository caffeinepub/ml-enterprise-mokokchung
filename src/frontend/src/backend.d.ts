import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StatusHistory {
    status: string;
    timestamp: bigint;
    location: string;
}
export interface LabelDetails {
    weight: string;
    trackingNumber: string;
    serviceType: string;
    senderName: string;
    recipientAddress: string;
    recipientName: string;
    dimensions: string;
    senderAddress: string;
}
export interface ShipmentStatus {
    labelDetails: LabelDetails;
    status: string;
    trackingNumber: string;
    destination: string;
    origin: string;
    history: Array<StatusHistory>;
    currentLocation: string;
    expectedDelivery: bigint;
}
export interface WhatsAppQuery {
    courierPartner?: string;
    name: string;
    submittedBy: Principal;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface Inquiry {
    name: string;
    submittedBy: Principal;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Booking {
    id: bigint;
    customerName: string;
    created: bigint;
    dropOffLocation: string;
    submittedBy: Principal;
    email: string;
    notes?: string;
    packageDetails: string;
    phone: string;
    preferredPickupTime: string;
    pickupLocation: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createShipment(trackingNumber: string, origin: string, destination: string, expectedDelivery: bigint, senderName: string, senderAddress: string, recipientName: string, recipientAddress: string, weight: string, dimensions: string, serviceType: string): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllShipments(): Promise<Array<ShipmentStatus>>;
    getAllWhatsAppQueries(): Promise<Array<WhatsAppQuery>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLabelDetails(trackingNumber: string): Promise<LabelDetails | null>;
    getShipmentsByStatus(status: string): Promise<Array<ShipmentStatus>>;
    getTrackingInfo(trackingNumber: string): Promise<ShipmentStatus | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBooking(customerName: string, phone: string, email: string, pickupLocation: string, dropOffLocation: string, packageDetails: string, preferredPickupTime: string, notes: string | null, created: bigint): Promise<void>;
    submitInquiry(name: string, email: string, message: string, timestamp: bigint): Promise<void>;
    submitWhatsAppQuery(name: string, phone: string, email: string, message: string, courierPartner: string | null, timestamp: bigint): Promise<void>;
    updateShipmentStatus(trackingNumber: string, newStatus: string, location: string, timestamp: bigint): Promise<void>;
}
