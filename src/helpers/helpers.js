export const removeFilm = (id, selectedFilms) =>
    selectedFilms.filter((film) => 
        film.imdbID !== id
    );

export const sortByDate = (selectedFilms) =>
    selectedFilms.sort((a, b) => {
        const dateA = new Date(a.Year.slice(0, 4));
        const dateB = new Date(b.Year.slice(0, 4));
        return dateA - dateB;
    });

export const sortByName = (selectedFilms) => 
    selectedFilms.sort((a, b) => {
            const titleA = a.Title.toLowerCase()
            const titleB = b.Title.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
    });
