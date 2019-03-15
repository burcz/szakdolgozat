# Webes alkalmazás futtatása, monitorozása és skálázása felhőben

<!-- toc -->

- [I. Bevezetés](#i-bevezetes)
  * [1. A felhő alapú rendszerek ismertetése](#1-a-felho-alapu-rendszerek-ismertetese)
    + [a. Mi az a felhő?](#a-mi-az-a-felho)
    + [b. Nagy felhőszolgáltatók](#b-nagy-felhoszolgaltatok)
  * [2. Célkitűzések](#2-celkituzesek)
    + [a. A rendszer követelményei](#a-a-rendszer-kovetelmenyei)
    + [b. Az alkalmazás követelményei](#b-az-alkalmazas-kovetelmenyei)
- [II. A téma kifejtése](#ii-a-tema-kifejtese)
  * [1. A szerverüzemeltetés általános problémái](#1-a-szerveruzemeltetes-altalanos-problemai)
    + [a. Rendelkezésre állás](#a-rendelkezesre-allas)
    + [b. Erőforrások](#b-eroforrasok)
  * [2. Különbségek a felhő alapú és a nem felhő alapú szerverüzemeltetés között](#2-kulonbsegek-a-felho-alapu-es-a-nem-felho-alapu-szerveruzemeltetes-kozott)
    + [a. Felelősségi körök](#a-felelossegi-korok)
    + [b. Időgazdálkodás](#b-idogazdalkodas)
  * [3. A felhőben megtalálható komponensek bemutatása](#3-a-felhoben-megtalalhato-komponensek-bemutatasa)
    + [a. Néhány szó a Google Cloudról](#a-nehany-szo-a-google-cloudrol)
    + [b. TODO: valamilyen csoportosítás kitalálása](#b-todo-valamilyen-csoportositas-kitalalasa)
  * [4. Az egyéb, kapcsolódó technológiák bemutatása](#4-az-egyeb-kapcsolodo-technologiak-bemutatasa)
    + [a. github](#a-github)
    + [b. Stackdriver](#b-stackdriver)
    + [c. kubernetes](#c-kubernetes)
    + [d. nodeJS](#d-nodejs)
    + [e. A fejlesztést segítő eszközök](#e-a-fejlesztest-segito-eszkozok)
  * [5. A különböző komponensek összekapcsolása, a rendszer kiépítési vázlata](#5-a-kulonbozo-komponensek-osszekapcsolasa-a-rendszer-kiepitesi-vazlata)
    + [a. github-gcloud](#a-github-gcloud)
    + [b. gcloud-kubernetes](#b-gcloud-kubernetes)
    + [c. gcloud+kubernetes-Stackdriver](#c-gcloudkubernetes-stackdriver)
    + [d. A kapcsolatok ábrázolása](#d-a-kapcsolatok-abrazolasa)
  * [6. A rendszer kiépítése és automatizálása](#6-a-rendszer-kiepitese-es-automatizalasa)
    + [a. TODO: komponensek es leiro file-jaik (yml)](#a-todo-komponensek-es-leiro-file-jaik-yml)
    + [b. Webapplikáció build trigger és leíró](#b-webapplikacio-build-trigger-es-leiro)
    + [c. Egy automatizált folyamat, ami összerakja a rendszert](#c-egy-automatizalt-folyamat-ami-osszerakja-a-rendszert)
  * [7. A tesztelési folyamat ismertetése](#7-a-tesztelesi-folyamat-ismertetese)
  * [8. A monitorozási folyamat ismertetése](#8-a-monitorozasi-folyamat-ismertetese)
    + [a. Stackdriver metrikák](#a-stackdriver-metrikak)
  * [9. Katasztrófakezelés](#9-katasztrofakezeles)
- [III. Befejezés](#iii-befejezes)
  * [1. Záró gondolatok](#1-zaro-gondolatok)
  * [2. Saját vélemény](#2-sajat-velemeny)
  * [3. További fejlesztési lehetőségek ismertetése](#3-tovabbi-fejlesztesi-lehetosegek-ismertetese)
    + [a. Adatbázis](#a-adatbazis)
    + [b. Multirégió](#b-multiregio)
- [IV. Irodalomjegyzék](#iv-irodalomjegyzek)
- [V. Mellékletek](#v-mellekletek)

<!-- tocstop -->

## I. Bevezetés
### 1. A felhő alapú rendszerek ismertetése
#### a. Mi az a felhő?
#### b. Nagy felhőszolgáltatók
### 2. Célkitűzések
#### a. A rendszer követelményei
#### b. Az alkalmazás követelményei
## II. A téma kifejtése
### 1. A szerverüzemeltetés általános problémái
#### a. Rendelkezésre állás
#### b. Erőforrások
### 2. Különbségek a felhő alapú és a nem felhő alapú szerverüzemeltetés között
#### a. Felelősségi körök
#### b. Időgazdálkodás
### 3. A felhőben megtalálható komponensek bemutatása
#### a. Néhány szó a Google Cloudról
#### b. TODO: valamilyen csoportosítás kitalálása
### 4. Az egyéb, kapcsolódó technológiák bemutatása
#### a. github
#### b. Stackdriver
#### c. kubernetes
#### d. nodeJS
#### e. A fejlesztést segítő eszközök
docker, VSCode, gcloud, kubectl
### 5. A különböző komponensek összekapcsolása, a rendszer kiépítési vázlata
#### a. github-gcloud
#### b. gcloud-kubernetes
#### c. gcloud+kubernetes-Stackdriver
#### d. A kapcsolatok ábrázolása
### 6. A rendszer kiépítése és automatizálása
#### a. TODO: komponensek es leiro file-jaik (yml)
#### b. Webapplikáció build trigger és leíró
#### c. Egy automatizált folyamat, ami összerakja a rendszert
### 7. A tesztelési folyamat ismertetése
### 8. A monitorozási folyamat ismertetése
#### a. Stackdriver metrikák
### 9. Katasztrófakezelés
## III. Befejezés
### 1. Záró gondolatok
### 2. Saját vélemény
### 3. További fejlesztési lehetőségek ismertetése
#### a. Adatbázis
#### b. Multirégió
## IV. Irodalomjegyzék
## V. Mellékletek
