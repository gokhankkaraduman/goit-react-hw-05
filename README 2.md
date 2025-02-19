oit-react-hw-05/
│── public/  # Statik dosyalar (favicons, logos, vs.)
│
│── src/
│   ├── assets/  # Global statik varlıklar (ikonlar, fontlar, resimler)
│   │   ├── images/
│   │   ├── icons/
│   │   ├── styles/  # Global CSS (varsayılan stiller, tema dosyaları)
│   │       ├── variables.css
│   │       ├── globals.css
│   │
│   ├── components/  # Tekrar kullanılabilir bileşenler
│   │   ├── UI/  # Küçük ama önemli UI bileşenleri
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.module.css
│   │   │   ├── Loader/
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Loader.module.css
│   │   ├── Layout/  # Sayfa düzeni bileşenleri
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Header.module.css
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Footer.module.css
│   │   │   ├── Navigation/
│   │   │   │   ├── Navigation.jsx
│   │   │   │   ├── Navigation.module.css
│   │   ├── Movie/  # Film ile ilgili bileşenler
│   │   │   ├── MovieList/
│   │   │   │   ├── MovieList.jsx
│   │   │   │   ├── MovieList.module.css
│   │   │   ├── MovieCard/
│   │   │   │   ├── MovieCard.jsx
│   │   │   │   ├── MovieCard.module.css
│   │   │   ├── MovieCast/
│   │   │   │   ├── MovieCast.jsx
│   │   │   │   ├── MovieCast.module.css
│   │   │   ├── MovieReviews/
│   │   │   │   ├── MovieReviews.jsx
│   │   │   │   ├── MovieReviews.module.css
│   │   ├── ThemeSwitcher/
│   │   │   ├── ThemeSwitcher.jsx
│   │   │   ├── ThemeSwitcher.module.css
│   │   ├── Carousel/
│   │   │   ├── Carousel.jsx
│   │   │   ├── Carousel.module.css
│   │
│   ├── pages/  # Sayfa bileşenleri
│   │   ├── HomePage/
│   │   │   ├── HomePage.jsx
│   │   │   ├── HomePage.module.css
│   │   ├── MoviesPage/
│   │   │   ├── MoviesPage.jsx
│   │   │   ├── MoviesPage.module.css
│   │   ├── MovieDetailsPage/
│   │   │   ├── MovieDetailsPage.jsx
│   │   │   ├── MovieDetailsPage.module.css
│   │   ├── NotFoundPage/
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── NotFoundPage.module.css
│   │
│   ├── hooks/  # Özel React Hook'ları
│   │   ├── useFetchMovies.js
│   │   ├── useTheme.js
│   │
│   ├── services/  # API isteklerini yöneten yardımcı fonksiyonlar
│   │   ├── api.js
│   │
│   ├── context/  # Global state yönetimi (örneğin, tema yönetimi)
│   │   ├── ThemeContext.js
│   │
│   ├── router/  # React Router yapılandırması
│   │   ├── routes.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│
│── .gitignore
│── package.json
│── vite.config.js
│── README.md

    --ıce-cold:#a0d2eb;
    --freeze-purple:#e5eaf5;
    --medium-purple:#d0bdf4;
    --purple-pain:#8458B3;
    --heavy-purple:#a28089;
    --crown-yellow:#fff685;