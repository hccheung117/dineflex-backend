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

This schema supports:
- User management with roles
- Restaurant listings
- Booking system with availability
- Weekly schedule per restaurant
- Time-slot-specific offers (early bird, last-minute)

### Restaurants

`restaurants` table

| Column          | Type     | Description                                  |
|-----------------|----------|----------------------------------------------|
| `id`            | UUID     | Primary key                                  |
| `name`          | String   | Restaurant name                              |
| `description`   | String   | Long description of the restaurant           |
| `location`      | String   | City or area                                 |
| `cuisine`       | String   | Type of cuisine (e.g. Italian, Japanese)     |
| `phone`         | String   | Contact phone number                         |
| `images`        | String[] | Array of image URLs                          |
| `hasEarlyBird`  | Boolean  | Whether early bird offers are supported      |
| `hasLastMinute` | Boolean  | Whether last-minute offers are supported     |
| `ownerId`       | UUID     | Foreign key → `users(id)` (restaurant owner) |

### Users

`users` table

| Column      | Type   | Description                                      |
|-------------|--------|--------------------------------------------------|
| `id`        | UUID   | Primary key                                      |
| `name`      | String | Full name of the user                            |
| `email`     | String | Unique email address                             |
| `password`  | String | Hashed password                                  |
| `salt`      | String | Password salt                                    |
| `role`      | Enum   | User role: `customer`, `restaurant_owner`, `admin` |

> **Enum: `UserRole`**  
> `customer` | `restaurant_owner` | `admin`

### Bookings

`bookings` table

| Column           | Type     | Description                                   |
|------------------|----------|-----------------------------------------------|
| `id`             | UUID     | Primary key                                   |
| `userId`         | UUID     | Foreign key → `users(id)` (customer)          |
| `restaurantId`   | UUID     | Foreign key → `restaurants(id)`               |
| `date`           | Date     | Booking date (YYYY-MM-DD)                     |
| `time`           | String   | Booking time (HH:MM)                          |
| `partySize`      | Integer  | Number of people                              |
| `customerName`   | String   | Name entered for reservation                  |
| `customerEmail`  | String   | Email entered for reservation                 |
| `customerPhone`  | String   | Phone number entered for reservation          |
| `status`         | String   | Booking status (e.g. `confirmed`)             |
| `confirmationCode` | String | Unique confirmation string                    |

### Offers

None at this moment.

```typescript
// TODO: Define offers schema for early bird and last-minute special deals
// Include fields like discount amount, valid time periods, restrictions
```

### Availability Slots

`restaurant_time_slot` table

| Column        | Type      | Description                                   |
|---------------|-----------|-----------------------------------------------|
| `id`          | UUID      | Primary key                                   |
| `restaurantId`| UUID      | Foreign key → `restaurants(id)`               |
| `dayOfWeek`   | Enum      | Day of the week (`monday` to `sunday`)        |
| `timeSlots`   | String[]  | List of available times (e.g. `['17:00']`)    |
| `slotType`    | Enum      | Slot type: `regular`, `earlyBird`, `lastMinute` |

> **Enum: `Weekday`**  
> `monday` | `tuesday` | `wednesday` | `thursday` | `friday` | `saturday` | `sunday`  

> **Enum: `SlotType`**  
> `regular` | `earlyBird` | `lastMinute`

### Entity Relationships

1. Customer requests availability for a restaurant on a specific date.
2. System determines the weekday.
3. Queries `restaurant_time_slot` for that weekday and restaurant.
4. Removes booked times from `bookings` table.
5. Returns available time slots, each annotated with `slotType`.

## Development Guidelines

The backend provides RESTful API endpoints for the frontend to consume. Data is returned in JSON format and follows standard HTTP status codes.
