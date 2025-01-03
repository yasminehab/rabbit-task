# Rabbit API Optimization Project

This project implements and optimizes APIs for Rabbit, focusing on efficient handling of product listings and order analytics.

## Requirements Implementation

### 1. Top 10 Most Frequently Ordered Products API

- Implemented in `src/order/order.controller.ts` and `src/order/order.service.ts`
- Endpoint: GET `/order/top-products?area={area}`
- Uses efficient database queries with Prisma ORM in `src/order/order.repository.ts`
- Implements caching to handle millions of requests efficiently

### 2. Optimized List Products API

- Improved existing `/products` endpoint in `src/product/product.controller.ts`
- Implemented efficient filtering and pagination in `src/product/product.repository.ts`
- Updated DTO in `src/product/dto/get-all-products.dto.ts` for better input validation

## Key Optimizations

1. **Efficient Database Queries**: 
   - Used Prisma's `groupBy`, `orderBy`, and aggregation functions for top products.
   - Implemented pagination and filtering for product listing.

2. **Caching**:
   - Implemented caching using `@nestjs/cache-manager` to reduce database load.
   - Applied caching to both top products and product listing APIs.

3. **Input Validation**:
   - Used DTOs with class-validator for robust input validation.

4. **Pagination**:
   - Implemented offset-based pagination for product listing to handle large datasets efficiently.

5. **Indexing**:
   - Added database indexes on frequently queried fields (area, productId) to improve query performance.

## Performance Considerations

- The APIs are designed to handle millions of requests by leveraging caching and efficient database queries.
- Pagination in the product listing API ensures consistent performance regardless of the total number of products.
- The top products API uses aggregation at the database level to minimize data transfer and processing.

## Future Optimizations

- Implement database-level caching for frequently accessed data.
- Add rate limiting to prevent API abuse.
- Implement more sophisticated caching strategies, such as cache invalidation on data updates.
- Consider implementing database sharding for horizontal scaling if data volume grows significantly.

## Testing

- Unit tests have been added for the new and modified endpoints.
- Load testing is recommended to verify performance under high concurrency.

## Environment Setup

1. Clone the repository
2. Install dependencies: `yarn install`
3. Set up the database and update the `.env` file with the connection string
4. Run migrations: `yarn migrate:dev`
5. Start the server: `yarn start:dev`

## API Documentation

- GET `/order/top-products?area={area}`: Returns the top 10 most frequently ordered products in the specified area.
- GET `/products?page={page}&limit={limit}&category={category}&area={area}&search={search}&sort={field_direction}`: Returns a paginated and filtered list of products.
- GET `/products/categories`: Returns a list of all unique product categories.

For detailed API documentation, refer to the Swagger documentation available at `/api` when running the server.

## Known Limitations

- The current category system uses unique identifiers for each product as categories. This may not provide the most meaningful categorization for users.
- Future improvements could include adding a more general category field or creating a separate Category table and adding prices for the data to be sorted.

