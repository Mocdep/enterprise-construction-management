CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL,
  contact VARCHAR(255)
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  code VARCHAR(100) NOT NULL,
  project_id INTEGER REFERENCES projects(id),
  customer_id INTEGER REFERENCES customers(id)
);

CREATE TABLE revenues (
  id SERIAL PRIMARY KEY,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  project_id INTEGER REFERENCES projects(id),
  contract_id INTEGER REFERENCES contracts(id)
);

CREATE TABLE costs (
  id SERIAL PRIMARY KEY,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  project_id INTEGER REFERENCES projects(id),
  contract_id INTEGER REFERENCES contracts(id)
);

CREATE TABLE cashflows (
  id SERIAL PRIMARY KEY,
  amount NUMERIC NOT NULL,
  type VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  project_id INTEGER REFERENCES projects(id),
  contract_id INTEGER REFERENCES contracts(id)
);

CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  ref_id INTEGER NOT NULL,
  status VARCHAR(100),
  percent INTEGER,
  note TEXT
);