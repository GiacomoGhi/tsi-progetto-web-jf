##############################################
### 10 ISERT SETUP NELLA TABELLA "ARTICLE" ###
#####  5 NEWS = TRUE e 5 POST "SEMPLICI" #####
#### 3 news con il B64 della loro immagine ###
##############################################

## FILE IMMAGINE ATTESI CON MASK '*.JPG' ##

# PATH 
## PATH LOCALE PER LA LETTURA DEI FILE IMMAGINE (NON PARAMETRIZZATO)
## IMPOSTARE IL PATH CORRETTO PER LA LETTURA DEI FILE IMMAGINE
img_folder = 'IMG'


# LIB
import base64
import os
from datetime import datetime


#FUNZIONI

## CALCOLO B64 DEI FILE IMG
def encode_b64(file_path):
    with open(file_path, 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string


## 3 INSERT IN NEWS E CON IMMAGINE.B64
for i in range(1, 4):
    filename = f'file_0{i}.jpg'
    image_path = os.path.join(img_folder, filename)
    encoded_image = encode_b64(image_path)

    # Creare un INSERT statement per l'articolo corrente
    insert_statement = f"""
    INSERT INTO article (id, createdAt, lastModifiedAt, createdByUserId, lastModifiedByUserId, active, title, description, image, isNews)
    VALUES ('{datetime.now().strftime('%Y%m%d%H%M%S%f')}', '{datetime.now()}', '{datetime.now()}', 'user1', 'user2', true, 'Articolo', 'Descrizione articolo', '{encoded_image}', 10, true);
    """

    # Eseguire l'INSERT statement
    print(insert_statement)

# Eseguire le operazioni di inserimento per le successive 2 insert con isNews a True e image a NULL
for i in range(4, 6):
    # Creare un INSERT statement per l'articolo corrente
    insert_statement = f"""
    INSERT INTO article (id, createdAt, lastModifiedAt, createdByUserId, lastModifiedByUserId, active, title, description, image, liked, isNews)
    VALUES ('{datetime.now().strftime('%Y%m%d%H%M%S%f')}', '{datetime.now()}', '{datetime.now()}', 'user1', 'user2', true, 'Articolo', 'Descrizione articolo', NULL, 10, true);
    """

    # Eseguire l'INSERT statement
    print(insert_statement)

# Eseguire le operazioni di inserimento per le ultime 5 insert con isNews a False e image a NULL
for i in range(6, 11):
    # Creare un INSERT statement per l'articolo corrente
    insert_statement = f"""
    INSERT INTO article (id, createdAt, lastModifiedAt, createdByUserId, lastModifiedByUserId, active, title, description, image, liked, isNews)
    VALUES ('{datetime.now().strftime('%Y%m%d%H%M%S%f')}', '{datetime.now()}', '{datetime.now()}', 'user1', 'user2', true, 'Articolo', 'Descrizione articolo', NULL, 10, false);
    """

    # Eseguire l'INSERT statement
    print(insert_statement)
