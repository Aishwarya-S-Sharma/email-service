# Resilient Email Sending Service

## Overview
This project implements a resilient email sending service in JavaScript. The service handles multiple providers, retry logic with exponential backoff, fallback mechanisms, idempotency, rate limiting, and status tracking.

## Key Features
- Retry mechanism with exponential backoff
- Fallback between providers
- Idempotency to prevent duplicate sends
- Rate limiting
- Status tracking
- Circuit breaker pattern
- Basic logging
- Mock providers

## Usage
1. Clone the repository.
2. Install dependencies (if any).
3. Run the service using `node index.js`.
   
