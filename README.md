<p align="center">
  <img src="src\assets\wholewoman.png" alt="whole woman" width="700"/>
</p>


# AfyaHer 🌸 
##  Women’s Health Empowerment Platform

AfyaHer is a web-based health empowerment platform built for women across Africa, starting with Kenya. It enables women to access timely, respectful, and stigma-free health services such as reproductive health support, mental wellness, period care, and access to verified doctors — all in a culturally sensitive environment.

##  Key Features

- **Secure Auth System** – User roles: Patient | Doctor | Admin
- **Doctor Dashboard** – Manage appointments, update profile, view patients
- **Patient Dashboard** – Book appointments, join community, chat with bot
- **AI Chatbot (AfyaBot)** – Ask questions about period pain, STIs, endometriosis, etc.
- **Appointment Scheduling** – Real-time booking system
- **Language Options** – English and Kiswahili
- **Mental Health Support** – Community forums, anonymous chat
- **Civic and Health Education** – Accessible, localised content

---

## Folder Structure
<pre>
AfyaHer/
├── public/
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ ├── Appointments/
│ │ ├── Community/
│ │ ├── Chatbot/
│ │ ├── Dashboard/
│ │ ├── Layout/
│ │ └── Pages/
│ ├── lib/
│ │ └── supabaseClient.ts
│ ├── store/
│ │ └── authStore.ts
│ ├── App.tsx
│ └── main.tsx
├── supabase/
│ └── schema.sql
├── README.md
├── package.json
└── tsconfig.json
</pre>

---

## Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **State Management**: Zustand
- **AI Chatbot**: Rule-based (with potential LLM upgrade)
- **Deployment**: Netlify / Vercel (recommendation)

---

## How to run

### 1. Clone the repo
```
git clone https://github.com/HellenDianaNjeri/AfyaHer.git
cd AfyaHer
```
### 2. Install Dependencies
```
npm install
```
### 3. Setup environment variables
```
Create a .env file:
```
### 4.Run locally
```
npm run dev
```
# Roles & Permissions
| Role    | Access                                               |
| ------- | ---------------------------------------------------- |
| Patient | Book appointments, chat with doctors, join community |
| Doctor  | View appointments, update profile, join forum        |
| Admin   | Manage users, update platform settings (coming soon) |

# Database Tables
- user_profiles
- appointments
- messages
- community_posts
- health_articles

# Roadmap
 - Supabase Auth Integration

 - Doctor/Patient Dashboards

 - Chatbot v1 (rule-based)

 - Chatbot v2 (LLM-powered)

 - Mobile responsive UI

 - Analytics Dashboard for Admin

 # Contributing
Pull requests are welcome! For major changes, please open an issue first.

# Built With Love 
by [Hellen Diana](https://github.com/HellenDianaNjeri/AfyaHer.git)

AfyaHer is committed to making healthcare safe, stigma-free, and empowering for all women. This project began as a hackathon idea and is growing into a full platform. Let’s build the future of feminine health, together.
