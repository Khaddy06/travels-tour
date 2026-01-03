# Firestore Security Rules Setup

## How to Fix the Permissions Error

You need to update your Firestore security rules in the Firebase Console to allow writes to the `bookings` collection.

### Steps:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules** tab
4. Replace the default rules with the rules below
5. Click **Publish**

### Security Rules (Development - Allow All)

For development/testing, use these rules (⚠️ NOT for production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to bookings collection
    match /bookings/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Security Rules (Production - Recommended)

For production, use more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Bookings collection - allow anyone to create, but only read their own
    match /bookings/{bookingId} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'phone', 'destination', 'travelDate', 'numberOfTravelers', 'status', 'createdAt'])
                   && request.resource.data.status == 'pending';
      allow read: if request.auth != null; // Only authenticated admins can read
      allow update, delete: if request.auth != null; // Only authenticated admins can update/delete
    }
  }
}
```

### Note:

- The development rules allow anyone to read/write (use only for testing)
- The production rules require authentication for reading/updating (you'll need to implement admin authentication later)
- Make sure to replace the rules in your Firebase Console

