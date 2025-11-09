# dl-tool
# 🎬 DL Tool

**DL Tool** est un utilitaire automatisé qui permet de télécharger des vidéos à partir d'une interface web simple hébergée sur **GitHub Pages**, en utilisant **GitHub Actions** pour exécuter le script Python.

---

## 🚀 Fonctionnement

1. L'utilisateur ouvre la page web `index.html`.
2. Il colle un lien de vidéo et clique sur **TÉLÉCHARGER**.
3. La page envoie la commande à GitHub Actions.
4. GitHub exécute `script/download.py` via le workflow `.github/workflows/download.yml`.
5. La vidéo téléchargée est publiée automatiquement dans les **Releases** du dépôt.

---

## ⚙️ Installation et configuration

### 1️⃣ Activer GitHub Pages
- Va dans **Settings → Pages**
- Source : `main`
- Dossier : `/public`
- Clique sur **Save**
- Le site sera accessible à :  
  `https://zaea-svg.github.io/dl-tool`

---

### 2️⃣ Créer un token GitHub
- Va sur [https://github.com/settings/tokens](https://github.com/settings/tokens)
- Clique sur **Generate new token (classic)**
- Donne-lui un nom (ex : `dl-tool`)
- Coche les scopes :
  - ✅ `repo`
  - ✅ `workflow`
- Clique sur **Generate token** et copie-le.

---

### 3️⃣ Ajouter le secret GitHub
- Va dans ton dépôt → **Settings → Secrets → Actions → New repository secret**
- Nom -
-  Valeur : ton token GitHub

---

### 4️⃣ Modifier ton fichier `public/index.html`
Ouvre `public/index.html` et remplace ces deux lignes :

```js
const token = 'TON_GITHUB_TOKEN';
const repo = 'zaea-svg/dl-tool';
  
