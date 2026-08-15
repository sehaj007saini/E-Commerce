-- Sample Products for E-Commerce Application
-- Insert these products if they don't already exist

-- Laptops
INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'MacBook Pro 16"', 'Powerful laptop with M3 Pro chip, 16GB RAM, 512GB SSD, stunning Retina display', 'Apple', 2499.99, 'Laptop', '2024-01-15', true, 25, 'macbook-pro.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'MacBook Pro 16"');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Dell XPS 15', 'Premium business laptop with Intel i7, 32GB RAM, 1TB SSD, 4K OLED display', 'Dell', 1899.99, 'Laptop', '2024-02-10', true, 30, 'dell-xps.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Dell XPS 15');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Lenovo ThinkPad X1 Carbon', 'Ultra-light business laptop with Intel i5, 16GB RAM, 512GB SSD', 'Lenovo', 1499.99, 'Laptop', '2024-01-20', true, 40, 'thinkpad-x1.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Lenovo ThinkPad X1 Carbon');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'HP Pavilion Gaming', 'Gaming laptop with RTX 4060, Intel i7, 16GB RAM, 512GB SSD', 'HP', 1299.99, 'Laptop', '2024-03-05', true, 20, 'hp-pavilion.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'HP Pavilion Gaming');

-- Headphones
INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Sony WH-1000XM5', 'Industry-leading noise cancellation, 30hr battery, premium sound quality', 'Sony', 399.99, 'Headphone', '2024-01-10', true, 50, 'sony-xm5.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Sony WH-1000XM5');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Apple AirPods Pro 2', 'Active noise cancellation, spatial audio, USB-C charging case', 'Apple', 249.99, 'Headphone', '2024-02-01', true, 60, 'airpods-pro.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Apple AirPods Pro 2');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Bose QuietComfort Ultra', 'Premium noise cancelling headphones with immersive audio', 'Bose', 429.99, 'Headphone', '2024-01-25', true, 35, 'bose-qc-ultra.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Bose QuietComfort Ultra');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'JBL Tune 770NC', 'Wireless over-ear headphones with noise cancellation, 70hr battery', 'JBL', 129.99, 'Headphone', '2024-03-01', true, 45, 'jbl-tune.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'JBL Tune 770NC');

-- Mobile Phones
INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'iPhone 15 Pro Max', 'A17 Pro chip, titanium design, 256GB storage, ProMotion display', 'Apple', 1199.99, 'Mobile', '2024-01-05', true, 55, 'iphone-15-pro.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'iPhone 15 Pro Max');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Samsung Galaxy S24 Ultra', 'Snapdragon 8 Gen 3, 200MP camera, S Pen, 512GB storage', 'Samsung', 1299.99, 'Mobile', '2024-02-15', true, 48, 'galaxy-s24.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Samsung Galaxy S24 Ultra');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Google Pixel 8 Pro', 'Google Tensor G3, advanced AI features, 128GB storage', 'Google', 999.99, 'Mobile', '2024-01-12', true, 40, 'pixel-8-pro.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Google Pixel 8 Pro');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'OnePlus 12', '5G smartphone with Snapdragon 8 Gen 3, 256GB storage, 120Hz display', 'OnePlus', 799.99, 'Mobile', '2024-02-20', true, 35, 'oneplus-12.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'OnePlus 12');

-- Electronics
INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Samsung 65" QLED 4K TV', 'Quantum HDR, smart TV features, 120Hz refresh rate', 'Samsung', 1499.99, 'Electronics', '2024-01-08', true, 15, 'samsung-qled.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Samsung 65" QLED 4K TV');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Sony PlayStation 5', 'Next-gen gaming console with 4K gaming, 825GB SSD', 'Sony', 499.99, 'Electronics', '2024-02-05', true, 25, 'ps5.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Sony PlayStation 5');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Nikon D7500 DSLR Camera', 'Professional camera with 20.9MP sensor, 4K video recording', 'Nikon', 1199.99, 'Electronics', '2024-01-18', true, 18, 'nikon-d7500.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Nikon D7500 DSLR Camera');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Amazon Echo Dot 5th Gen', 'Smart speaker with Alexa, improved audio, compact design', 'Amazon', 49.99, 'Electronics', '2024-03-10', true, 100, 'echo-dot.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Amazon Echo Dot 5th Gen');

-- Toys
INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'LEGO Star Wars Millennium Falcon', 'Ultimate collector series with 7541 pieces, detailed interior', 'LEGO', 849.99, 'Toys', '2024-01-22', true, 12, 'lego-falcon.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'LEGO Star Wars Millennium Falcon');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Nerf Elite 2.0 Commander', 'Motorized dart blaster with 25 darts, customizable', 'Nerf', 39.99, 'Toys', '2024-02-28', true, 50, 'nerf-commander.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Nerf Elite 2.0 Commander');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Hot Wheels Ultimate Garage', 'Multi-level garage playset with car storage for 140+ cars', 'Hot Wheels', 149.99, 'Toys', '2024-01-30', true, 28, 'hotwheels-garage.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Hot Wheels Ultimate Garage');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Barbie Dreamhouse', 'Three-story dollhouse with 10 rooms, elevator, pool slide', 'Barbie', 199.99, 'Toys', '2024-02-14', true, 22, 'barbie-dreamhouse.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Barbie Dreamhouse');

-- Fashion
INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Nike Air Max 270', 'Comfortable lifestyle sneakers with Max Air cushioning', 'Nike', 159.99, 'Fashion', '2024-01-16', true, 65, 'nike-airmax.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Nike Air Max 270');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Adidas Ultraboost 23', 'Premium running shoes with responsive Boost cushioning', 'Adidas', 189.99, 'Fashion', '2024-02-08', true, 55, 'adidas-ultraboost.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Adidas Ultraboost 23');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Levi''s 501 Original Jeans', 'Classic straight fit denim jeans, timeless style', 'Levi''s', 69.99, 'Fashion', '2024-01-25', true, 80, 'levis-501.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Levi''s 501 Original Jeans');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Ray-Ban Aviator Sunglasses', 'Iconic aviator style with UV protection, gold frames', 'Ray-Ban', 179.99, 'Fashion', '2024-03-02', true, 45, 'rayban-aviator.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Ray-Ban Aviator Sunglasses');

-- Low stock items
INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Microsoft Surface Laptop 5', 'Premium Windows laptop with Intel i7, 16GB RAM, 512GB SSD', 'Microsoft', 1599.99, 'Laptop', '2024-01-28', true, 8, 'surface-laptop.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Microsoft Surface Laptop 5');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Beats Studio Pro', 'Premium wireless headphones with spatial audio and lossless', 'Beats', 349.99, 'Headphone', '2024-02-12', true, 5, 'beats-studio.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Beats Studio Pro');

-- Out of stock items
INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Nintendo Switch OLED', 'Gaming console with vibrant OLED screen, enhanced audio', 'Nintendo', 349.99, 'Electronics', '2024-01-14', false, 0, 'switch-oled.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Nintendo Switch OLED');

INSERT INTO product (name, description, brand, price, category, release_date, product_available, stock_quantity, image_name, image_type)
SELECT 'Canon EOS R5', 'Professional mirrorless camera with 45MP sensor, 8K video', 'Canon', 3899.99, 'Electronics', '2024-02-18', false, 0, 'canon-r5.jpg', 'image/jpeg'
WHERE NOT EXISTS (SELECT 1 FROM product WHERE name = 'Canon EOS R5');

-- Default Users
ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255);
CREATE SEQUENCE IF NOT EXISTS users_id_seq;
ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq');
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 0) + 1, false);

INSERT INTO users (username, email, password, role)
SELECT 'admin', 'admin@ecom.com', 'admin123', 'ROLE_ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

INSERT INTO users (username, email, password, role)
SELECT 'user', 'user@ecom.com', 'user123', 'ROLE_USER'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'user');

-- Coupons
INSERT INTO coupons (code, discount_percentage, discount_amount, active, description)
SELECT 'WELCOME10', 10.00, 0.00, true, '10% off on your order!'
WHERE NOT EXISTS (SELECT 1 FROM coupons WHERE code = 'WELCOME10');

INSERT INTO coupons (code, discount_percentage, discount_amount, active, description)
SELECT 'SUMMER20', 20.00, 0.00, true, '20% Summer special discount!'
WHERE NOT EXISTS (SELECT 1 FROM coupons WHERE code = 'SUMMER20');

INSERT INTO coupons (code, discount_percentage, discount_amount, active, description)
SELECT 'FLAT50', 0.00, 50.00, true, 'Flat $50 off on total checkout!'
WHERE NOT EXISTS (SELECT 1 FROM coupons WHERE code = 'FLAT50');

