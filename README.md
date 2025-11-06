# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Showcasing creative work in frontend development, UI/UX design, video editing, graphic design, and more.

## 🚀 Features

- **Modern Stack**: Next.js 13+ with App Router, TypeScript, Tailwind CSS
- **Responsive Design**: Fully responsive across all devices
- **Dark Mode**: Built-in theme support with next-themes
- **Animations**: Smooth animations using Framer Motion and GSAP
- **Performance**: Optimized for fast loading and great user experience
- **SEO**: Comprehensive metadata and Open Graph tags
- **Form Handling**: Contact form with Web3Forms integration

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Forms**: Web3Forms

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Web3Forms access key:
```
NEXT_PUBLIC_FORM_ACCESS_KEY=your_access_key_here
```

Get your access key from [Web3Forms](https://web3forms.com)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

Build for production:
```bash
npm run build
```

The output will be in the `out` directory (static export).

## 📁 Project Structure

```
portfolio-website/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects pages
│   └── contact/           # Contact page
├── components/             # React components
│   ├── ui/                # UI components (shadcn/ui)
│   └── ...                 # Feature components
├── constants/             # Constants and configuration
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
│   └── images/            # Image assets
└── ...                    # Config files
```

## 🎨 Customization

### Adding Your Images

1. Replace placeholder images in `/public/images/`:
   - `/public/images/projects/` - Project images
   - `/public/images/photography/` - Photography gallery
   - `/public/images/categories/` - Project category images

2. Update image paths in:
   - `components/Work.tsx`
   - `app/projects/page.tsx`

### Updating Content

- **Skills**: Edit `components/Hero.tsx` and `components/About.tsx`
- **Projects**: Update project data in `components/Work.tsx`
- **Blog Posts**: Edit `app/blog/page.tsx`
- **Social Links**: Update in `components/Contact.tsx`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The site is configured for static export and will work perfectly on Vercel.

### Other Platforms

Since this is a static export, you can deploy to:
- Netlify
- GitHub Pages
- Any static hosting service

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FORM_ACCESS_KEY` | Web3Forms access key for contact form | Yes |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Form submission endpoint | No (has default) |
| `NEXT_PUBLIC_SITE_URL` | Your site URL for metadata | No |

## 🐛 Troubleshooting

### Build Errors

- Make sure all environment variables are set
- Run `npm run lint` to check for linting errors
- Check TypeScript errors with `npm run type-check`

### Form Not Working

- Verify your Web3Forms access key is correct
- Check browser console for errors
- Ensure `NEXT_PUBLIC_FORM_ACCESS_KEY` is set

## 📄 License

This project is private and proprietary.

## 👤 Author

**Swastik Gupta**
- Portfolio: [Your Portfolio URL]
- GitHub: [@ShirokoKun](https://github.com/ShirokoKun)
- LinkedIn: [Swastik Gupta](https://www.linkedin.com/in/swastik-gupta-72814725b)

---

Built with ❤️ using Next.js

