CREATE TABLE projects (
id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
project_name VARCHAR(150) NOT NULL,
img_url VARCHAR(1000) NOT NULL,
project_description VARCHAR(2500) NOT NULL,
quantity INTEGER NOT NULL,
price_eth DECIMAL(10, 2) NOT NULL,
open_date_gmt DATETIME NOT NULL,
royalty_percent DECIMAL(5, 2) NOT NULL,
active BOOLEAN NOT NULL,
PRIMARY KEY (id)
);
INSERT INTO projects (
project_name,
img_url,
project_description,
quantity,
price_eth,
open_date_gmt,
royalty_percent,
active
)
VALUES (
'Project 1',
'https://nyc3.digitaloceanspaces.com/genartnft-cdn/examples/satellite.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00Z3MZVE9HUP42MC42%2F20250302%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250302T191039Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=10787a26bf9f470afb3707e278dfdadb6de184176bde29956d93512dedd14f59',
'This is a short description of the first project. It is a really good
project. It is made by a really good artist. It is really good work. It has good
code. It has good visuals. And it has heart and soul.',
25,
1.0,
'2024-02-01 09:00:00',
7,
0
),
(
'Project 2',
'https://nyc3.digitaloceanspaces.com/genartnft-cdn/examples/diffReact.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00Z3MZVE9HUP42MC42%2F20250302%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250302T190913Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=5c37abc95c991551586a1339518d57a17238791884a75624111b5e45f070674a',
'This is a short description of the second project. It is a really good
project. It is made by a really good artist. It is really good work. It has good
code. It has good visuals. And it has heart and soul.',
64,
1.5,
'2023-12-15 07:30:00',
5,
0
),
(
'Project 3',
'https://nyc3.digitaloceanspaces.com/genartnft-cdn/examples/purpleOrangeWidget.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00Z3MZVE9HUP42MC42%2F20250302%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20250302T191014Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=62cdf480b28f5fca398a9f3a5628e631132640f286e560092efa57565d07f7c3',
'This is a short description of the third project. It is a really good
project. It is made by a really good artist. It is really good work. It has good
code. It has good visuals. And it has heart and soul.',
512,
2.0,
'2024-03-19 05:00:00',
2,
0
);