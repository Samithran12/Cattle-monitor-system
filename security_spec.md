# Firestore Security Specification

## Data Invariants
1. A user can only read, create, update, and delete their own user profile document at `/users/{userId}` where `userId == request.auth.uid`.
2. Animals stored in `/animals/{animalId}` must have `resource.data.userId == request.auth.uid` for reads/deletes, and `request.resource.data.userId == request.auth.uid` for creates/updates.
3. Smart tasks stored in `/tasks/{taskId}` must belong to `request.auth.uid`.
4. Advisor messages in `/advisorMessages/{messageId}` must belong to `request.auth.uid`.

## Dirty Dozen Payloads Test Runner Specs
All unauthenticated requests, requests targeting other users' data, or payloads missing required user identity fields must return PERMISSION_DENIED.
