INSERT INTO profiles (id, name, role, heroBadge, tagline, availabilityText, bio, cvSummary, avatar, location, phone, email, linkedin) VALUES (
  1, 
  'Fajri Awwaluddin, S.T.', 
  'Electrical dan Instrument Engineer', 
  'HIRE ME', 
  'Available for new career opportunities', 
  'Available to Work', 
  'An Electrical Engineering graduate specializing in Electrical & Instrumentation Engineering, certified as an OHS Officer by BNSP. I have hands-on experience in developing technical documents (WI/SOP/Checksheet), interpreting P&ID, and assisting in industrial project commissioning. Recognized for driving production optimization and cost efficiency. Skilled in the fundamentals of PLC, HMI, and SCADA.', 
  'Profesional teknik yang berdedikasi tinggi dengan pengalaman di bidang instrumentasi, analisis kegagalan sistem, dan optimisasi proses industri. Memiliki kemampuan kuat dalam membaca P&ID, menyusun standar operasional, serta pengembangan perangkat lunak berbasis IoT dan antarmuka web untuk kebutuhan internal teknik.', 
  'https://ui-avatars.com/api/?name=Fajri+Awwaluddin&size=600&background=E9582A&color=fff&font-size=0.35&bold=true', 
  'Bekasi, Jawa Barat', 
  '+62 895-3578-79220', 
  'fajriawwaluddin01@gmail.com', 
  'https://www.linkedin.com/in/fajri-awwaluddin'
);

INSERT INTO skills (category, items) VALUES ('Software', '["AutoCAD","SCADA/HMI Design","TIA Portal (Siemens)","EcoStruxure Machine (Schneider)","Factory IO","Ms. Excel","Ms. Word","Ms. PowerPoint"]');
INSERT INTO skills (category, items) VALUES ('Teknikal', '["ESP32 & Arduino","Panel Wiring","Commissioning"]');
INSERT INTO skills (category, items) VALUES ('Dokumen', '["P&ID Interpretation","SOP / WI","Checksheet / OHS"]');
INSERT INTO education (institution, degree, duration, achievements) VALUES ('UIN Sunan Gunung Djati Bandung', 'S1 - Teknik Elektro (IPK: 3.40)', '2019 - 2023', '["Fokus studi pada Sistem Kendali dan Instrumentasi Industri.","Lulus dengan predikat Sangat Memuaskan."]');

INSERT INTO experiences (slug, title, company, duration, details, photos, body) VALUES (
    'iot-developer-brin',
    'IoT Developer',
    'PT Engineering Sinar Abadi & BRIN',
    '2021 - 2022',
    '["Developed an Internet of Things (IoT) based system using the ESP32 microcontroller.","Integrated industrial sensors for real-time telemetry data transmission."]',
    '["https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop"]',
    'Collaborating with researchers from the National Research and Innovation Agency (BRIN), this project aimed to build an IoT-based environmental and industrial monitoring ecosystem.

Using the ESP32 board as the main brain, I designed a data acquisition system from various analog and digital industrial sensors. The captured data was then transmitted wirelessly via MQTT protocol to a central server to be processed in real-time, allowing anomaly detection in milliseconds.
'
  );
INSERT INTO experiences (slug, title, company, duration, details, photos, body) VALUES (
    'magang-engineering-staff',
    'Engineering Staff Intern',
    'PT Matra Roda Piranti',
    '2022 - 2023',
    '["Analyzed production bottlenecks, redesigned layouts and production trolleys (3x cost efficiency).","Compiled systematic documentation including 5 FMEAs, 20 Working Instructions (WI), and 20 Checksheets.","Created 4 high-precision engineering modeling designs using Autodesk Inventor."]',
    '["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1565439390118-2834f40f0d2c?q=80&w=800&auto=format&fit=crop"]',
    'At PT Matra Roda Piranti, my approach centered on lean manufacturing. By observing directly on the production floor, I identified bottlenecks hindering material flow.

Through layout redesign and trolley re-engineering using Autodesk Inventor, the material distribution process became much more efficient, significantly cutting operational costs. FMEA (Failure Mode and Effects Analysis) documents were also systematically compiled to prevent potential future failures.
'
  );
INSERT INTO experiences (slug, title, company, duration, details, photos, body) VALUES (
    'magang-instrument-engineer',
    'Instrument Engineer Intern',
    'PT Mipcon Prima Industri',
    '2023 - 2024',
    '["Compiled 100+ Working Instructions (WI) & operational Checksheets.","Read, verified, and analyzed 14 Piping and Instrumentation Diagram (P&ID) drawings.","Built an integrated internal web prototype for efficient engineering document management."]',
    '["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"]',
    'As an Instrument Engineer Intern at PT Mipcon Prima Industri, my main responsibility focused on operational standardization and optimization of technical document management. During this period, I dealt directly with hundreds of critical documents that required high precision.

Besides compiling documentation such as Working Instructions and Checksheets, analyzing P&IDs became a daily routine to ensure installation accuracy in the field. My biggest success in this position was developing a web-based document management system prototype that digitalized the team''s workflow, reducing document search time by up to 40%.
'
  );
INSERT INTO certificates (slug, title, date, issuer, description, link, body) VALUES (
    'k3-listrik-bnsp',
    'Electrical OHS Certification',
    'June 2026',
    'BNSP (National Professional Certification Board)',
    'Electrical Occupational Health and Safety (OHS) competency certification that tests installation skills, LOTO, and PUIL standards.',
    '#',
    ''
  );
INSERT INTO certificates (slug, title, date, issuer, description, link, body) VALUES (
    'plc-scada-basic',
    'PLC & SCADA Programming Basic',
    'January 2025',
    'Ministry of Industry RI',
    'Intensive training on programming Omron & Siemens PLCs as well as designing industrial SCADA HMIs.',
    '#',
    ''
  );
INSERT INTO achievements (slug, title, date, issuer, description, body) VALUES (
    'best-student-award',
    'Outstanding Electrical Engineering Student',
    '2023',
    'UIN Sunan Gunung Djati Bandung',
    'Awarded to the graduate with the most innovative final year research (Computer Vision Edge AI) in the class of 2019.',
    ''
  );
INSERT INTO achievements (slug, title, date, issuer, description, body) VALUES (
    'juara-1-robotik',
    '1st Place National Robotics Contest',
    '2022',
    'Ministry of Education and Culture',
    'Won first place in the Firefighting Smart Robot (KRPAI) division by designing the fastest navigation algorithm.',
    ''
  );
INSERT INTO articles (slug, title, date, category, summary, image, body) VALUES (
    'mengenal-iot-industri',
    'Understanding the Role of IoT in the Manufacturing Industry',
    'July 12, 2026',
    'Internet of Things',
    'The Internet of Things (IoT) has revolutionized how machines interact on the factory floor, bringing new efficiency and predictability.',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    'In the Industry 4.0 era, IoT is no longer just a trend but an absolute necessity for modern factories. Smart sensors can monitor machine temperature, vibration, and room humidity in real-time.

With data collected continuously, the maintenance team can predict when a machine will break down before the damage actually occurs. This is called Predictive Maintenance, saving billions of rupiahs annually for large-scale industries.
'
  );
INSERT INTO articles (slug, title, date, category, summary, image, body) VALUES (
    'otomatisasi-dokumen-engineering',
    'Engineering Document Automation with Web Apps',
    'May 20, 2026',
    'Web Development',
    'How to turn stacks of paper Working Instructions into an integrated web system that cuts work time by up to 40%.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    'As engineers, we are often trapped in a sea of repetitive documents such as Working Instructions (WI) and daily Checksheets. Compiling them manually is not only time-consuming but also prone to human error.

Leveraging web development skills, I built an internal system where engineers simply fill out a web form, and the system automatically generates industry-standard PDF formats. This digital transformation is crucial for modern operations.
'
  );
INSERT INTO articles (slug, title, date, category, summary, image, body) VALUES (
    'pentingnya-k3-listrik',
    'Why Electrical OHS is Vital in the Workplace',
    'June 05, 2026',
    'Safety',
    'Workplace accidents caused by electricity can be fatal. Learn preventive measures and mandatory LOTO standards to be implemented.',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
    'Electrical Occupational Health and Safety (OHS) is a non-negotiable aspect. Many accidents in factories occur because Lockout/Tagout (LOTO) procedures are ignored when performing electrical panel maintenance.

Understanding single line diagrams and always using Arc Flash-rated Personal Protective Equipment (PPE) are some essential steps that separate a safe condition from a disaster.
'
  );
