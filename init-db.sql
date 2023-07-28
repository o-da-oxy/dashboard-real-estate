CREATE DATABASE real_estate;

CREATE TABLE realtors (
  realtor_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone VARCHAR(11),
  email VARCHAR(50),
  registration_date DATE
);

CREATE TABLE properties (
  property_id SERIAL PRIMARY KEY,
  district VARCHAR(50),
  square_meters NUMERIC(10,2),
  price BIGINT,
  date_built DATE,
  property_type VARCHAR(20),
  realtor_id INTEGER REFERENCES realtors(realtor_id)
);

INSERT INTO realtors (first_name, last_name, phone, email, registration_date) VALUES
  ('Alina', 'Pavlova', '89284657483', 'pavlova@mail.ru', '2021-01-01'),
  ('Petr', 'Belov', '89123456789', 'belov@mail.ru', '2021-02-01'),
  ('Gleb', 'Petrov', '89654321987', 'petrov@mail.ru', '2022-03-01'),
  ('Oleg', 'Filatov', '89654321987', 'filatov@mail.ru', '2022-03-01'),
  ('Nina', 'Hoge', '89654321987', 'hoge@mail.ru', '2023-03-01'),
  ('Alan', 'Jonson', '89654321987', 'jonson@mail.ru', '2023-03-01');

INSERT INTO properties (district, square_meters, price, date_built, property_type, realtor_id) VALUES
  ('Замоскворечье', 100.50, 25000000, '2000-01-01', 'квартира', 1),
  ('Таганский', 200.75, 50000000, '2010-01-01', 'квартира', 2),
  ('Тверской', 50.25, 125000000, '1995-01-01', 'офисное помещение', 3);