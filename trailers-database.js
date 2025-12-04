// База данных трейлеров для популярных фильмов
// Формат: IMDb ID -> YouTube Video ID
const trailersDatabase = {
    // Новинки 2023-2024
    'tt15398776': 'uYPbbksJxIg', // Oppenheimer
    'tt1517268': 'pBk4NYhWNMM',   // Barbie
    'tt15239678': 'Way9Dexny3w',  // Dune: Part Two
    'tt10366206': 'yjRHZEUamCc',  // John Wick: Chapter 4
    'tt10872600': 'JfVOs4VSpmA',  // Spider-Man: No Way Home
    'tt1745960': '1g3_CFmnU7k',   // Top Gun: Maverick
    'tt1630029': 'd9MyW72ELq0',   // Avatar: The Way of Water
    'tt6710474': 'wxN1T1uxQ2g',   // Everything Everywhere All at Once
    'tt1877830': 'mqqft2x_Aa4',   // The Batman
    'tt11286314': 'RbIxYm3mKzI',  // Don't Look Up
    'tt1160419': 'n9xhJrPXop4',   // Dune
    'tt9376612': 'giWIr7U1deA',   // Shang-Chi
    'tt9032400': 'x_me3xsvDgk',   // Eternals
    'tt3228774': 'gmRKv7n2If8',   // Cruella
    'tt8332922': 'BpdDN9d9Jio',   // A Quiet Place Part II
    'tt6723592': 'LdOM0x0XDMo',   // Tenet
    'tt2948372': 'xOsLIiBStEs',   // Soul
    'tt2953050': 'CaimKeDcudo',   // Encanto
    'tt2584384': 'tL4McUzXfFI',   // Jojo Rabbit
    'tt8579674': 'YqNYrYUiMfg',   // 1917
    
    // Классика
    'tt0111161': 'NmzuHjWmXOc',  // The Shawshank Redemption
    'tt0068646': 'UaVTIH8mujA',  // The Godfather
    'tt0071562': 'qJr92K_hKl0',  // The Godfather Part II
    'tt0468569': 'EXeTwQWrcwY',  // The Dark Knight
    'tt0050083': '_13J_9B5jEk',  // 12 Angry Men
    'tt0108052': 'gG22XNhtnoY',  // Schindler's List
    'tt0167260': 'r7Dtn5_F3Us',  // The Lord of the Rings: The Return of the King
    'tt0110912': 's7EdQ4FqbhY',  // Pulp Fiction
    'tt0109830': 'bLvqoHBptjg',  // Forrest Gump
    'tt0137523': 'qtRKdVHc-cE',  // Fight Club
    'tt1375666': 'YoHD9XEInc0',  // Inception
    'tt0120737': 'V75dMMIW2B4',  // The Lord of the Rings: The Fellowship of the Ring
    'tt0080684': 'JNwNXF9Y6kY',  // Star Wars: Episode V
    'tt0133093': 'vKQi3bBA1y8',  // The Matrix
    'tt0816692': 'zSWdZVtXT7E',  // Interstellar
    'tt0120689': '2NdCMBV_l28',  // The Green Mile
    'tt0167261': 'LbfMDwc4azU',  // The Lord of the Rings: The Two Towers
    'tt0060196': 'IFNUGzCOQoI',  // The Good, the Bad and the Ugly
    'tt0114369': 'znmZoVkCjpI',  // Se7en
    'tt0102926': 'W6Mm8Sbe__o',  // The Silence of the Lambs
    
    // Современные хиты
    'tt6751668': '5xH0HfJHsaY',  // Parasite
    'tt7286456': 'zAGVQLHvwOY',  // Joker
    'tt4154796': 'TcMBFSGVi1c',  // Avengers: Endgame
    'tt4154756': '6ZfuNTqbHE8',  // Avengers: Infinity War
    'tt1345836': 'g8evyE9TuYk',  // The Dark Knight Rises
    'tt0172495': 'owK1qxDselE',  // Gladiator
    'tt0482571': 'ijXruSzfGEc',  // The Prestige
    'tt0110413': 'jawVxq1Iyl0',  // Léon: The Professional
    'tt0407887': 'auYbpnEwBBg',  // The Departed
    'tt0088763': 'qvsgGtivCgs',  // Back to the Future
    'tt0253474': 'BFwGqLa_oAo',  // The Pianist
    'tt0103064': 'CRRlbK5w8AE',  // Terminator 2
    'tt0120586': 'XfqWu2yPnNs',  // American History X
    'tt0118799': 'pAYEQP8gx3w',  // Life Is Beautiful
    'tt0120815': 'zwhP5b4tD6g',  // Saving Private Ryan
    'tt0054215': 'Wz719b9QUqY',  // Psycho
    'tt0034583': 'BkL9l7qovsE',  // Casablanca
    'tt0401792': 'PR9JqhT_VfY',  // Sin City
    'tt0087843': 'DUvF_zO1BCA',  // Once Upon a Time in America
    'tt0076759': 'vZ734NWnAHA',  // Star Wars
    
    // Дополнительные
    'tt0245429': 'ByXuk9QqQkk',  // Spirited Away
    'tt0082971': 'XkkzKHCx154',  // Raiders of the Lost Ark
    'tt2096673': 'yRUAzGQ3nSY',  // Inside Out
    'tt0105236': 'vayksn4Y93A',  // Reservoir Dogs
    'tt0099685': 'qo5jJpHtI1Y',  // Goodfellas
    'tt0073486': 'OXrcDonY-B8',  // One Flew Over the Cuckoo's Nest
    'tt0477348': 'OLCL6OYbSTw',  // No Country for Old Men
    'tt0087332': 'vntAEVjPBzQ',  // Ghostbusters
    'tt0078748': 'LjLamj-b0I8',  // Alien
    'tt0090605': 'oSeQQlaCZgU',  // Aliens
    'tt0083658': 'gCcx85zbxz4',  // Blade Runner
    'tt1856101': 'gCcx85zbxz4',  // Blade Runner 2049
    'tt1392190': 'hEJnMQG9ev8',  // Mad Max: Fury Road
    'tt0780504': '-DSVDcw6iW8',  // Drive
    'tt2562232': 'uJfLoE6hanc',  // Birdman
    'tt5580390': 'XFYWazblaUA',  // The Shape of Water
    'tt3783958': '0pdqf4P9MB8',  // La La Land
    'tt2543164': 'tFMo3UJ4B4g',  // Arrival
    'tt1634106': 'vOUVVDWdXbo',  // Bloodshot
    'tt0093773': 'Y1rxOLCh5Ew',  // Predator
    'tt0095016': 'jaJuwKCmJbY',  // Die Hard
    'tt0075148': 'DP3MFBzMH2o',  // Rocky
    'tt0083944': 'M8E99_stBjE',  // First Blood
    'tt0332452': 'znWb-TmXb9I',  // Troy
    'tt0416449': 'UrIbxk7idYA',  // 300
    'tt0112573': 'or1gBugSjs4',  // Braveheart
    'tt1205489': 'o0wuH6yPTa4',  // Gran Torino
    'tt1010048': 'AIzbwV7on6Q',  // Slumdog Millionaire
    'tt0180093': 'jzk-lmU4KZ4',  // Requiem for a Dream
    'tt0338013': 'rb8aOp_00EY',  // Eternal Sunshine
    'tt0268978': 'YWwAOutgWBQ',  // A Beautiful Mind
    'tt0264464': 'gaLDyrun_Cc',  // Catch Me If You Can
    'tt0120382': 'dlnmQbPGuls',  // The Truman Show
    'tt1130884': 'v8yrZSkKxTA',  // Shutter Island
    'tt0993846': 'iszwuX1AK6A',  // The Wolf of Wall Street
    'tt1853728': 'eUdM9vrCbow',  // Django Unchained
    'tt0361748': 'KnrRy6kSFF0',  // Inglourious Basterds
    'tt0266697': 'ot6C1ZKyiME',  // Kill Bill
    'tt0118715': 'cd-go0oBF4Y',  // The Big Lebowski
    'tt0116282': 'h2tY82z3xXU'   // Fargo
};

// Функция для получения трейлера по IMDb ID
function getTrailerByImdbId(imdbId) {
    const videoId = trailersDatabase[imdbId];
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
}
