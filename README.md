# DineFlex Backend

## Overview

This repository contains the backend code for DineFlex, a web application that connects diners with restaurants offering early bird reservations and last-minute table availability. The prototype aims to demonstrate the core functionality of the platform to potential users, investors, and restaurant partners.

## About DineFlex

DineFlex operates on a similar model to Early Table, allowing users to discover and book special dining offers.

## Features in the Prototype Phase

- **Restaurant Management**: Store and serve information about participating restaurants
- **Booking System**: Handle reservations for early bird and last-minute tables at participating restaurants
- **RESTful API**: Provide endpoints for the frontend to consume

## Prototype Scope

This prototype focuses on the customer-facing aspects of DineFlex. The restaurant dashboard functionality will be implemented in future iterations.

## API Endpoints

https://github.com/hccheung117/dineflex-apidoc

## Database Schema

### Restaurants

```typescript
// TODO: Define restaurant schema with fields like name, address, cuisine type, etc.
```

### Users

```typescript
// TODO: Define user schema with different roles (customer, restaurant owner, service agent, admin)
// Include fields like email, password, role, profile information
```

### Bookings

```typescript
// TODO: Define booking schema with fields like date, time, party size, status
// Include relationships with restaurants and users
```

### Offers

```typescript
// TODO: Define offers schema for early bird and last-minute special deals
// Include fields like discount amount, valid time periods, restrictions
```

### Availability Slots

```typescript
// TODO: Define availability slots schema to track restaurant table availability
// Include fields like date, time, capacity, and booking status
```

### Entity Relationships

```
// TODO: Document primary relationships between entities
// Example: Restaurants have many Availability Slots
// Example: Users can have many Bookings
```

## Development Guidelines

The backend provides RESTful API endpoints for the frontend to consume. Data is returned in JSON format and follows standard HTTP status codes.
