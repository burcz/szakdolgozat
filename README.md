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
    + [c. Biztonság](#c-biztonsag)
  * [3. A felhőben megtalálható komponensek bemutatása](#3-a-felhoben-megtalalhato-komponensek-bemutatasa)
    + [a. Néhány szó a Google Cloudról](#a-nehany-szo-a-google-cloudrol)
    + [b. TODO: valamilyen csoportosítás kitalálása a komponensekre](#b-todo-valamilyen-csoportositas-kitalalasa-a-komponensekre)
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
    + [b. Webes alkalmazás build trigger és leíró file](#b-webes-alkalmazas-build-trigger-es-leiro-file)
    + [c. A rendszert felállító, automatizált folyamat](#c-a-rendszert-felallito-automatizalt-folyamat)
  * [7. Monitorozás](#7-monitorozas)
    + [a. Stackdriver metrikák](#a-stackdriver-metrikak)
  * [8. Tesztelés](#8-teszteles)
    + [a. A rendszer tesztelése](#a-a-rendszer-tesztelese)
    + [b. Az alkmalmazás tesztelése](#b-az-alkmalmazas-tesztelese)
    + [c. A monitoring tesztelése](#c-a-monitoring-tesztelese)
  * [9. Katasztrófakezelés](#9-katasztrofakezeles)
    + [a. Alertrendszer](#a-alertrendszer)
- [III. Befejezés](#iii-befejezes)
  * [1. Záró gondolatok](#1-zaro-gondolatok)
    + [a. Üzemeltetés](#a-uzemeltetes)
    + [b. Költségek](#b-koltsegek)
  * [2. Saját vélemény](#2-sajat-velemeny)
    + [a. Változó terhelés kezelése](#a-valtozo-terheles-kezelese)
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
#### c. Biztonság
### 3. A felhőben megtalálható komponensek bemutatása
#### a. Néhány szó a Google Cloudról
#### b. TODO: valamilyen csoportosítás kitalálása a komponensekre
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
#### b. Webes alkalmazás build trigger és leíró file
#### c. A rendszert felállító, automatizált folyamat
### 7. Monitorozás
#### a. Stackdriver metrikák
### 8. Tesztelés
#### a. A rendszer tesztelése
#### b. Az alkmalmazás tesztelése
#### c. A monitoring tesztelése
### 9. Katasztrófakezelés
#### a. Alertrendszer
## III. Befejezés
### 1. Záró gondolatok
#### a. Üzemeltetés
#### b. Költségek
### 2. Saját vélemény
#### a. Változó terhelés kezelése
Fizetős tárhelyeknél mindig probléma van, előre jelzett többletforgalom esetén is (LifeT!lt)
### 3. További fejlesztési lehetőségek ismertetése
#### a. Adatbázis
#### b. Multirégió
## IV. Irodalomjegyzék
## V. Mellékletek
