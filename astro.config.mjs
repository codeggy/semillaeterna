// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// Importar configuraciones modulares del sidebar desde cada carpeta de contenido
import { sidebarPredicas } from './src/content/docs/predicas/sidebar.config.ts';
import { sidebarSermones } from './src/content/docs/sermones/sidebar.config.ts';
import { sidebarEnsenanzasPracticas } from './src/content/docs/ensenanzas-practicas/sidebar.config.ts';
import { sidebarDoctrinasFundamentales } from './src/content/docs/doctrinas-fundamentales/sidebar.config.ts';
import { sidebarFundamentosFe } from './src/content/docs/fundamentos-fe/sidebar.config.ts';
import { vidaCristianaSidebar } from './src/content/docs/vida-cristiana/sidebar.config.ts';


// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		starlight({
			title: '',
			logo: {
				src: './src/assets/semilla-eterna.png',
				alt: 'Logo de Semilla Eterna'
			},
			favicon: '/semilla.png',

			social: [
				{ icon: 'github', label: 'Github', href: 'https://github.com/paularmstrong/onerepo' },
				{ icon: 'discord', label: 'Discord', href: 'https://onerepo.tools/discord/' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				sidebarPredicas,
				sidebarSermones,
				sidebarEnsenanzasPracticas,
				sidebarFundamentosFe,
				vidaCristianaSidebar,
				// sidebarDoctrinasFundamentales
			],
		}),
	],
});
