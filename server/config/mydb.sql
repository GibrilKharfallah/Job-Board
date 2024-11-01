DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS advertisements;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS peoples;

CREATE TABLE IF NOT EXISTS companies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS advertisements (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL, 
    description VARCHAR(1200) NOT NULL,
    contractType VARCHAR(100) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL, 
    region VARCHAR(100) NOT NULL, 
    companyId INT,
    wage INT,
    startingDate DATE NOT NULL, 
    expiringDate DATE NOT NULL,
    FOREIGN KEY (companyId) REFERENCES companies(id)
);

CREATE TABLE IF NOT EXISTS peoples (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    firstname VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    password VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS applications (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    applicantId INT NOT NULL,
    jobId INT NOT NULL,
    applicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (applicantId) REFERENCES peoples(id),
    FOREIGN KEY (jobId) REFERENCES advertisements(id)
);

INSERT INTO companies (name, password, email, city, region)
VALUES 
('Tech Solutions', 'hashedPassword1', 'contact@techsolutions.com', 'Paris', 'Île-de-France'),
('Green Energy', 'hashedPassword2', 'info@greenenergy.com', 'Lyon', 'Auvergne-Rhône-Alpes'),
('HealthFirst', 'hashedPassword3', 'hello@healthfirst.com', 'Marseille', "Provence-Alpes-Côte d'Azur"),
('EduLearn', 'hashedPassword4', 'info@edulearn.com', 'Toulouse', 'Occitanie'),
('FinPro', 'hashedPassword5', 'support@finpro.com', 'Bordeaux', 'Nouvelle-Aquitaine'),
('AutoDrive', 'hashedPassword6', 'contact@autodrive.com', 'Nice', "Provence-Alpes-Côte d'Azur"),
('SmartBuild', 'hashedPassword7', 'jobs@smartbuild.com', 'Nantes', 'Pays de la Loire'),
('CloudNet', 'hashedPassword8', 'careers@cloudnet.com', 'Lille', 'Hauts-de-France'),
('BioPharm', 'hashedPassword9', 'hr@biopharm.com', 'Strasbourg', 'Grand Est'),
('AeroSpaceTech', 'hashedPassword10', 'info@aerospacetech.com', 'Toulon', "Provence-Alpes-Côte d'Azur"),
('EcoLogistics', 'hashedPassword11', 'support@ecologistics.com', 'Montpellier', 'Occitanie'),
('UrbanGrow', 'hashedPassword12', 'contact@urbangrow.com', 'Rennes', 'Bretagne'),
('SoftWorks', 'hashedPassword13', 'hello@softworks.com', 'Dijon', 'Bourgogne-Franche-Comté'),
('NextGenMedia', 'hashedPassword14', 'info@nextgenmedia.com', 'Nancy', 'Grand Est'),
('AgriTech', 'hashedPassword15', 'support@agritech.com', 'Angers', 'Pays de la Loire'),
('BlueOcean', 'hashedPassword16', 'contact@blueocean.com', 'Le Havre', 'Normandie'),
('QuantumIT', 'hashedPassword17', 'careers@quantumit.com', 'Clermont-Ferrand', 'Auvergne-Rhône-Alpes'),
('FutureVision', 'hashedPassword18', 'jobs@futurevision.com', 'Grenoble', 'Auvergne-Rhône-Alpes'),
('MedCare', 'hashedPassword19', 'info@medcare.com', 'Tours', 'Centre-Val de Loire'),
('BioTech', 'hashedPassword20', 'support@biotech.com', 'Orléans', 'Centre-Val de Loire');

INSERT INTO peoples (name, firstname, email, password, city, region, isAdmin)
VALUES 
('Durand', 'Sophie', 'sophie.durand@gmail.com', 'hashedPassword1', 'Paris', 'Île-de-France', FALSE),
('Martin', 'Lucas', 'lucas.martin@gmail.com', 'hashedPassword2', 'Lyon', 'Auvergne-Rhône-Alpes', FALSE),
('Bernard', 'Emma', 'emma.bernard@gmail.com', 'hashedPassword3', 'Marseille', "Provence-Alpes-Côte d'Azur", FALSE),
('Dubois', 'Paul', 'paul.dubois@gmail.com', 'hashedPassword4', 'Toulouse', 'Occitanie', FALSE),
('Thomas', 'Julie', 'julie.thomas@gmail.com', 'hashedPassword5', 'Bordeaux', 'Nouvelle-Aquitaine', FALSE),
('Robert', 'Nicolas', 'nicolas.robert@gmail.com', 'hashedPassword6', 'Nice', "Provence-Alpes-Côte d'Azur", FALSE),
('Richard', 'Camille', 'camille.richard@gmail.com', 'hashedPassword7', 'Nantes', 'Pays de la Loire', FALSE),
('Petit', 'Hugo', 'hugo.petit@gmail.com', 'hashedPassword8', 'Lille', 'Hauts-de-France', FALSE),
('Lefevre', 'Chloé', 'chloe.lefevre@gmail.com', 'hashedPassword9', 'Strasbourg', 'Grand Est', FALSE),
('Moreau', 'Arthur', 'arthur.moreau@gmail.com', 'hashedPassword10', 'Toulon', "Provence-Alpes-Côte d'Azur", FALSE),
('Simon', 'Manon', 'manon.simon@gmail.com', 'hashedPassword11', 'Montpellier', 'Occitanie', FALSE),
('Laurent', 'Thomas', 'thomas.laurent@gmail.com', 'hashedPassword12', 'Rennes', 'Bretagne', FALSE),
('Lemoine', 'Anaïs', 'anais.lemoine@gmail.com', 'hashedPassword13', 'Dijon', 'Bourgogne-Franche-Comté', FALSE),
('David', 'Alexandre', 'alexandre.david@gmail.com', 'hashedPassword14', 'Nancy', 'Grand Est', FALSE),
('Chevalier', 'Lucie', 'lucie.chevalier@gmail.com', 'hashedPassword15', 'Angers', 'Pays de la Loire', FALSE),
('Lambert', 'Maxime', 'maxime.lambert@gmail.com', 'hashedPassword16', 'Le Havre', 'Normandie', FALSE),
('Roux', 'Louise', 'louise.roux@gmail.com', 'hashedPassword17', 'Clermont-Ferrand', 'Auvergne-Rhône-Alpes', FALSE),
('Morin', 'Antoine', 'antoine.morin@gmail.com', 'hashedPassword18', 'Grenoble', 'Auvergne-Rhône-Alpes', FALSE),
('Gauthier', 'Claire', 'claire.gauthier@gmail.com', 'hashedPassword19', 'Tours', 'Centre-Val de Loire', FALSE),
('Perrin', 'Jules', 'jules.perrin@gmail.com', 'hashedPassword20', 'Orléans', 'Centre-Val de Loire', FALSE),
('Dupont', 'Claire', 'admin@admin', 'admin', 'Paris', 'Île-de-France', TRUE); 

INSERT INTO advertisements (title, description, contractType, sector, city, region, companyId, wage, startingDate, expiringDate)
VALUES
('Développeur Web', 'Développement de sites et applications web.', 'CDI', 'Informatique', 'Paris', 'Île-de-France', 1, 3500, '2024-01-01', '2024-12-31'),
('Ingénieur Énergies Renouvelables', 'Conception de solutions énergétiques.', 'CDI', 'Énergie', 'Lyon', 'Auvergne-Rhône-Alpes', 2, 4000, '2024-02-01', '2024-12-31'),
('Médecin Généraliste', 'Consultations et soins médicaux.', 'CDI', 'Santé', 'Marseille', "Provence-Alpes-Côte d'Azur", 3, 5000, '2024-03-01', '2024-12-31'),
('Formateur', 'Formation en ligne et en présentiel.', 'CDD', 'Éducation', 'Toulouse', 'Occitanie', 4, 2500, '2024-04-01', '2024-12-31'),
('Consultant Financier', 'Conseil en gestion financière.', 'CDI', 'Finance', 'Bordeaux', 'Nouvelle-Aquitaine', 5, 4500, '2024-05-01', '2024-12-31'),
('Ingénieur Automobile', 'Conception et maintenance de véhicules.', 'CDI', 'Automobile', 'Nice', "Provence-Alpes-Côte d'Azur", 6, 4000, '2024-06-01', '2024-12-31'),
('Architecte', 'Conception de bâtiments écologiques.', 'CDI', 'Construction', 'Nantes', 'Pays de la Loire', 7, 3800, '2024-07-01', '2024-12-31'),
('Ingénieur Réseau', 'Gestion des infrastructures réseau.', 'CDI', 'Informatique', 'Lille', 'Hauts-de-France', 8, 4200, '2024-08-01', '2024-12-31'),
('Biologiste', 'Recherche en biotechnologies.', 'CDD', 'Santé', 'Strasbourg', 'Grand Est', 9, 4700, '2024-09-01', '2024-12-31'),
('Technicien Aérospatial', 'Maintenance des systèmes aérospatiaux.', 'CDI', 'Aérospatiale', 'Toulon', "Provence-Alpes-Côte d'Azur", 10, 4200, '2024-10-01', '2024-12-31');

INSERT INTO applications (applicantId, jobId, applicationDate)
VALUES 
(1, 1, '2024-01-15'),
(2, 2, '2024-02-16'),
(3, 3, '2024-03-17'),
(4, 4, '2024-04-18'),
(5, 5, '2024-05-19'),
(6, 6, '2024-06-20'),
(7, 7, '2024-07-21'),
(8, 8, '2024-08-22'),
(9, 9, '2024-09-23'),
(10, 10, '2024-10-24'),
(11, 1, '2024-01-25'),
(12, 2, '2024-02-26'),
(13, 3, '2024-03-27'),
(14, 4, '2024-04-28'),
(15, 5, '2024-05-29'),
(16, 6, '2024-06-30'),
(17, 7, '2024-07-31'),
(18, 8, '2024-08-01'),
(19, 9, '2024-09-02'),
(20, 10, '2024-10-03');