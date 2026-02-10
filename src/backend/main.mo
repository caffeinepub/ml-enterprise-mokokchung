import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


// Migration. Specify the data migration function in with-clause

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
    submittedBy : Principal;
  };

  type WhatsAppQuery = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    courierPartner : ?Text;
    timestamp : Int;
    submittedBy : Principal;
  };

  type ShipmentStatus = {
    trackingNumber : Text;
    status : Text;
    origin : Text;
    destination : Text;
    currentLocation : Text;
    expectedDelivery : Int;
    labelDetails : LabelDetails;
    history : [StatusHistory];
  };

  type LabelDetails = {
    senderName : Text;
    senderAddress : Text;
    recipientName : Text;
    recipientAddress : Text;
    weight : Text;
    dimensions : Text;
    serviceType : Text;
    trackingNumber : Text;
  };

  type StatusHistory = {
    location : Text;
    status : Text;
    timestamp : Int;
  };

  type Booking = {
    id : Nat;
    customerName : Text;
    phone : Text;
    email : Text;
    pickupLocation : Text;
    dropOffLocation : Text;
    packageDetails : Text;
    preferredPickupTime : Text;
    notes : ?Text;
    created : Int;
    submittedBy : Principal;
  };

  let bookings = List.empty<Booking>();
  let inquiries = List.empty<Inquiry>();
  let shipments = Map.empty<Text, ShipmentStatus>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let whatsAppQueries = List.empty<WhatsAppQuery>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Inquiry Management
  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text, timestamp : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit inquiries");
    };
    let inquiry : Inquiry = {
      name;
      email;
      message;
      timestamp;
      submittedBy = caller;
    };
    inquiries.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.toArray();
  };

  // WhatsApp Query Management
  // Public endpoint - accessible to all users including guests (anonymous principals)
  // This allows website visitors to submit WhatsApp click-to-chat leads without authentication
  public shared ({ caller }) func submitWhatsAppQuery(
    name : Text,
    phone : Text,
    email : Text,
    message : Text,
    courierPartner : ?Text,
    timestamp : Int,
  ) : async () {
    // No authorization check - public endpoint for lead generation
    let whatsAppQuery : WhatsAppQuery = {
      name;
      phone;
      email;
      message;
      courierPartner;
      timestamp;
      submittedBy = caller;
    };
    whatsAppQueries.add(whatsAppQuery);
  };

  public query ({ caller }) func getAllWhatsAppQueries() : async [WhatsAppQuery] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all WhatsApp queries");
    };
    whatsAppQueries.toArray();
  };

  // Tracking Information (Public - no auth required)
  public query ({ caller }) func getTrackingInfo(trackingNumber : Text) : async ?ShipmentStatus {
    shipments.get(trackingNumber);
  };

  public query ({ caller }) func getLabelDetails(trackingNumber : Text) : async ?LabelDetails {
    switch (shipments.get(trackingNumber)) {
      case (null) { null };
      case (?shipment) { ?shipment.labelDetails };
    };
  };

  // Shipment Management (Admin only)
  public shared ({ caller }) func updateShipmentStatus(
    trackingNumber : Text,
    newStatus : Text,
    location : Text,
    timestamp : Int,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update shipment status");
    };
    switch (shipments.get(trackingNumber)) {
      case (null) {
        let history = [{
          location;
          status = newStatus;
          timestamp;
        }];
        let labelDetails = {
          senderName = "";
          senderAddress = "";
          recipientName = "";
          recipientAddress = "";
          weight = "";
          dimensions = "";
          serviceType = "";
          trackingNumber;
        };
        let newShipment : ShipmentStatus = {
          trackingNumber;
          status = newStatus;
          origin = location;
          destination = location;
          currentLocation = location;
          expectedDelivery = timestamp;
          labelDetails;
          history;
        };
        shipments.add(trackingNumber, newShipment);
      };
      case (?shipment) {
        let updatedHistory = shipment.history.concat([{
          location;
          status = newStatus;
          timestamp;
        }]);
        let updatedStatus = {
          shipment with
          status = newStatus;
          currentLocation = location;
          history = updatedHistory;
        };
        shipments.add(trackingNumber, updatedStatus);
      };
    };
  };

  public shared ({ caller }) func createShipment(
    trackingNumber : Text,
    origin : Text,
    destination : Text,
    expectedDelivery : Int,
    senderName : Text,
    senderAddress : Text,
    recipientName : Text,
    recipientAddress : Text,
    weight : Text,
    dimensions : Text,
    serviceType : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create shipments");
    };
    let labelDetails : LabelDetails = {
      senderName;
      senderAddress;
      recipientName;
      recipientAddress;
      weight;
      dimensions;
      serviceType;
      trackingNumber;
    };

    let shipment : ShipmentStatus = {
      trackingNumber;
      status = "Created";
      origin;
      destination;
      currentLocation = origin;
      expectedDelivery;
      labelDetails;
      history = [];
    };

    shipments.add(trackingNumber, shipment);
  };

  public query ({ caller }) func getAllShipments() : async [ShipmentStatus] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all shipments");
    };
    shipments.values().toArray();
  };

  public query ({ caller }) func getShipmentsByStatus(status : Text) : async [ShipmentStatus] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can query shipments by status");
    };
    shipments.filter(
      func(_ , shipment) {
        shipment.status == status;
      }
    ).values().toArray();
  };

  // Customer Bookings - New Section

  public shared ({ caller }) func submitBooking(
    customerName : Text,
    phone : Text,
    email : Text,
    pickupLocation : Text,
    dropOffLocation : Text,
    packageDetails : Text,
    preferredPickupTime : Text,
    notes : ?Text,
    created : Int,
  ) : async () {
    let booking : Booking = {
      id = bookings.size();
      customerName;
      phone;
      email;
      pickupLocation;
      dropOffLocation;
      packageDetails;
      preferredPickupTime;
      notes;
      created;
      submittedBy = caller;
    };
    bookings.add(booking);
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.toArray();
  };
};
