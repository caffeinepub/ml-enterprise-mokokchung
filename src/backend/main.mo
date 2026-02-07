import List "mo:core/List";
import Principal "mo:core/Principal";

actor {
  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
    submittedBy : Principal;
  };

  let inquiries = List.empty<Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text, timestamp : Int) : async () {
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
    inquiries.toArray();
  };
};
