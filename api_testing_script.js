import fetch from 'node-fetch';

describe('Fake Store API Tests', () => {
  let products;
  let response;

  beforeAll(async () => {
    response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
  });

  test('Server response code should be 200', () => {
    expect(response.status).toBe(200);
  });

  test('All products should have non-empty titles', () => {
    const emptyTitles = products.filter(p => !p.title || p.title.trim() === '');
    if (emptyTitles.length > 0) {
      console.warn('Products with empty titles:', emptyTitles);
    }
    expect(emptyTitles).toHaveLength(0);
  });

  test('All product prices should be non-negative', () => {
    const negativePrices = products.filter(p => p.price < 0);
    if (negativePrices.length > 0) {
      console.warn('Products with negative prices:', negativePrices);
    }
    expect(negativePrices).toHaveLength(0);
  });

  test('All product ratings should not exceed 5', () => {
    const invalidRatings = products.filter(p => p.rating && p.rating.rate > 5);
    if (invalidRatings.length > 0) {
      console.warn('Products with invalid ratings:', invalidRatings);
    }
    expect(invalidRatings).toHaveLength(0);
  });

  test('No defective products overall', () => {
    const defects = products.filter(p => 
      !p.title || 
      p.price < 0 || 
      (p.rating && p.rating.rate > 5)
    );
    if (defects.length > 0) {
      console.warn('Defective products found:', defects);
    }
    expect(defects).toHaveLength(0);
  });
});