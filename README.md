<p align="center">
  <a href="https://synbox.io" target="_blank">
    <img src="public/assets/icons/Synbox.svg" alt="Synbox Logo" width="340px" />
  </a>
</p>

<p align="center">
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-Personal_Use-red" alt="License Badge" />
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version Badge" />
  </a>
</p>

<p align="center">
  Effortlessly transcribe, translate, and annotate Japanese song lyrics from YouTube with AI, enhancing your viewing experience.
  <br/>
  <br />
  <a href="https://synbox.io"><strong>Visit Website »</strong></a>
  <br />
  <br />
  <a href="https://github.com/lifuhh/synbox">Explore the Docs</a> · 
  <a href="https://github.com/lifuhh/synbox/issues">Report Bug</a> · 
  <a href="https://github.com/lifuhh/synbox/issues">Request Feature</a>
</p>

---

## Table of Contents
- [Motivation](#motivation)
- [Features Showcase](#features-showcase)
- [Infrastructure / Tech Used](#infrastructure--tech-used)
- [Contacts](#contacts)
- [License](#license)


## **Motivation**

As a non-native speaker who loves Japanese music, I’ve often struggled with the lack of proper translations, romaji, or furigana in many Japanese music videos on YouTube. Singing along or truly connecting with the lyrics felt nearly impossible. This frustration inspired me to create Synbox — a tool that helps fans like me enjoy Japanese music on a deeper level by providing customizable overlays with translations, romaji, and furigana annotations, all while preserving the experience of the original music video.

## **Features Showcase**


🔊 **Accurate Transcriptions** - Leverage the latest OpenAI Whisper model to transcribe any Japanese song with precision.  
🈴 **Kanji Annotations with Furigana** - Furigana annotations make it easier to sing along with just Japanese lyrics, catering to users of all proficiency levels.  
🌍 **Custom Translations and Romaji** - Translate lyrics and annotate with romaji for a tailored viewing experience that meets the needs of diverse users.  
<br>
<p align="center">
  <img src="public/assets/showcase/overlay.gif" alt="Overlay Display" width="90%">
</p>

<p align="center">-</p>

🎵 **Discover New Music** - Explore a landing page with a carousel, an infinite scroll gallery, and links to top songs played in Japan, curated from YouTube’s popular playlists.  
<br>
<p align="center">
  <img src="public/assets/showcase/landingpage.gif" alt="Landing Page" width="90%">
</p>

<p align="center">-</p>

⚙️ **Customizable Lyrics Overlay** - Adjust the size, position, and appearance of the lyrics overlay to match your preferences and the music video’s styling.  

<p align="center">
  <img src="public/assets/showcase/customize.gif" alt="Customizable Overlay" width="90%">
</p>

<p align="center">-</p>

📌 **History and Bookmarks** - Keep track of your favorite songs with history and bookmark features, ensuring easy access to revisit and enjoy.  


<p align="center">
  <img src="public/assets/showcase/bookmark.png" alt="Bookmark Feature" width="90%">
</p>

<p align="center">-</p>

## **Infrastructure / Tech Used**

| **Category**          | **Technologies**                                                   |
|------------------------|--------------------------------------------------------------------|
| **Frontend**          | React, TypeScript, TailwindCSS, ShadCN UI, Vite                                    |
| **Backend**           | Python, Flask                                                    |
| **APIs**              | OpenAI API, Google Cloud APIs                                    |
| **Database**          | Appwrite                                                         |
| **Deployment**        | Netlify (frontend), Google Cloud Run (backend)                    |
| **Other Tools**       | ESLint, Prettier, Bun                                      |

### **System Architecture**

Synbox leverages a cutting edge full-stack architecture, combining a user-friendly frontend with powerful backend capabilities for seamless AI-driven transcription, translation, and annotation.

**Frontend** - Built with React, TypeScript, and TailwindCSS, the frontend provides a dynamic and responsive interface. Features include a landing page with an infinite scroll gallery, customizable lyrics overlays, viewing history and bookmarks.  

**Backend** - Powered by Flask and Python, the backend processes AI requests, including OpenAI Whisper model-based transcription, translation, and annotation.  

**Database** - Appwrite serves as the backend's database, handling storage of generated lyrics.

**APIs and Integrations**  
**OpenAI API** - For transcription, translation, and annotation of Japanese song lyrics.  
**Google Data API** - Integrates YouTube data to fetch popular Japanese playlists and user-submitted video links.  

**Hosting and Deployment**
The **frontend** is hosted on **Netlify**, ensuring fast and reliable delivery.  
The **backend** runs on **Google Cloud Run**, offering scalable and efficient serverless deployment.  

This architecture ensures Synbox remains fast, responsive, and capable of delivering a rich user experience while handling computationally intensive AI tasks in the backend.


## **Contacts**

Feel free to reach out for feedback, issues, or contributions:

**Lifu**: [LinkedIn](https://www.linkedin.com/in/lifuhh)
**GitHub Issues**: [Report issues](https://github.com/lifuhh/synbox/issues)

## **License**

This project is licensed under a **Personal Use License**.  
You may view and explore the codebase for personal learning purposes. Redistribution, modification, or commercial use is prohibited without explicit permission from the author.