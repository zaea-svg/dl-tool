import os
import requests
from bs4 import BeautifulSoup
import re
import yt_dlp

# Récupération de l'URL depuis l'événement GitHub
url = os.getenv('INPUT_URL') or os.getenv('URL')
if not url:
    print("Erreur : Pas d'URL fournie.")
    exit(1)

# Entêtes HTTP pour simuler un vrai navigateur
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': 'https://borntobefuck.com/'
}

# Scraping pour trouver l'iframe avec la vidéo
r = requests.get(url, headers=headers)
soup = BeautifulSoup(r.text, 'html.parser')
iframe = soup.find('iframe', {'src': re.compile(r'iframe\\.mediadelivery\\.net')})
if not iframe:
    print("Erreur : Iframe non trouvée.")
    exit(1)

embed_url = iframe['src']

# Téléchargement de la vidéo avec yt-dlp
ydl_opts = {
    'outtmpl': 'downloads/%(title)s.%(ext)s',
    'format': 'best[height<=1080]/best',
    'merge_output_format': 'mp4',
    'quiet': True,
}

os.makedirs('downloads', exist_ok=True)

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    ydl.download([embed_url])

print("Téléchargement terminé avec succès ✅")
