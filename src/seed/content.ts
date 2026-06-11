import fs from 'fs';
import path from 'path';
import type { Core } from '@strapi/strapi';

type SeedEvent = {
  slug: string;
  title: string;
  artist: string;
  speakers?: string[];
  type: 'CONCERT' | 'CONFERENCE' | 'ACTIVITY' | 'STAND';
  category: string;
  genre: string;
  origin: string;
  day: 'VEN' | 'SAM' | 'DIM';
  startsAt: string;
  endsAt: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  image: 'event_1.png' | 'event_2.png' | 'event_3.png';
  featured?: boolean;
};

const address = 'Fatal Fields, Ardennes, France';

const events: SeedEvent[] = [
  {
    slug: 'bain-glace-guide',
    title: 'Bain de glace guide',
    artist: 'Collectif Cryo',
    speakers: ['Maya Renard'],
    type: 'ACTIVITY',
    category: 'Activites',
    genre: 'Bien-etre extreme',
    origin: 'FR',
    day: 'VEN',
    startsAt: '2027-01-24T18:00:00+01:00',
    endsAt: '2027-01-24T19:00:00+01:00',
    location: 'Zone Cryo',
    latitude: 49.7614,
    longitude: 4.7168,
    description:
      "Initiation encadree a l'immersion froide, avec preparation respiratoire et equipe medicale a proximite.",
    image: 'event_3.png',
  },
  {
    slug: '2nd-gen',
    title: 'Ouverture Glitch',
    artist: '2nd-Gen',
    type: 'CONCERT',
    category: 'Concerts',
    genre: 'Glitch Ambient',
    origin: 'FR',
    day: 'VEN',
    startsAt: '2027-01-24T22:00:00+01:00',
    endsAt: '2027-01-24T23:45:00+01:00',
    location: 'Sanctuaire de Glace',
    latitude: 49.7621,
    longitude: 4.7185,
    description:
      'Une plongee dans le glitch ambient, entre textures numeriques fracturees, drones hypnotiques et derive algorithmique.',
    image: 'event_3.png',
    featured: true,
  },
  {
    slug: 'neve',
    title: 'Neve Live',
    artist: 'Neve',
    type: 'CONCERT',
    category: 'Concerts',
    genre: 'Techno Hypnotique',
    origin: 'BE',
    day: 'VEN',
    startsAt: '2027-01-24T23:30:00+01:00',
    endsAt: '2027-01-25T01:00:00+01:00',
    location: 'Scene Glacier',
    latitude: 49.763,
    longitude: 4.7202,
    description:
      'Une techno hypnotique concue pour accompagner la tombee de la nuit et faire vibrer la scene Glacier.',
    image: 'event_1.png',
  },
  {
    slug: 'whiteout',
    title: 'Whiteout',
    artist: 'Whiteout',
    type: 'CONCERT',
    category: 'Concerts',
    genre: 'Drone / Noise',
    origin: 'IS',
    day: 'VEN',
    startsAt: '2027-01-25T01:00:00+01:00',
    endsAt: '2027-01-25T02:15:00+01:00',
    location: 'Zone Cryo',
    latitude: 49.7614,
    longitude: 4.7168,
    description:
      'Un mur de drone et de noise inspire des paysages islandais, joue au coeur de la zone Cryo.',
    image: 'event_2.png',
  },
  {
    slug: 'consentement-espace-public',
    title: 'Corps, consentement et espace public',
    artist: 'Elise Martin',
    speakers: ['Nora Klein'],
    type: 'CONFERENCE',
    category: 'Conferences',
    genre: 'Table ronde',
    origin: 'FR',
    day: 'SAM',
    startsAt: '2027-01-25T15:00:00+01:00',
    endsAt: '2027-01-25T16:30:00+01:00',
    location: 'Agora Thermique',
    latitude: 49.7608,
    longitude: 4.7198,
    description:
      "Une table ronde sur le consentement, la liberte corporelle et la construction d'espaces festifs respectueux.",
    image: 'event_2.png',
  },
  {
    slug: 'frontex',
    title: 'Frontex',
    artist: 'Frontex',
    type: 'CONCERT',
    category: 'Concerts',
    genre: 'Techno Industrielle',
    origin: 'DE',
    day: 'SAM',
    startsAt: '2027-01-25T23:00:00+01:00',
    endsAt: '2027-01-26T01:00:00+01:00',
    location: 'Scene Glacier',
    latitude: 49.763,
    longitude: 4.7202,
    description:
      "Frontex transforme l'acier et la glace en arme sonique avec des rythmiques industrielles sans compromis.",
    image: 'event_1.png',
    featured: true,
  },
  {
    slug: 'permafrost',
    title: 'Permafrost',
    artist: 'Permafrost',
    type: 'CONCERT',
    category: 'Concerts',
    genre: 'EBM / Power',
    origin: 'SE',
    day: 'SAM',
    startsAt: '2027-01-26T00:30:00+01:00',
    endsAt: '2027-01-26T02:00:00+01:00',
    location: 'Zone Cryo',
    latitude: 49.7614,
    longitude: 4.7168,
    description:
      "EBM nordique, basses tendues et performance physique dans l'espace le plus froid du festival.",
    image: 'event_3.png',
  },
  {
    slug: 'blizzard',
    title: 'Blizzard',
    artist: 'Blizzard',
    type: 'CONCERT',
    category: 'Concerts',
    genre: 'Metal Experimental',
    origin: 'FI',
    day: 'SAM',
    startsAt: '2027-01-26T02:00:00+01:00',
    endsAt: '2027-01-26T03:30:00+01:00',
    location: 'Scene Glacier',
    latitude: 49.763,
    longitude: 4.7202,
    description:
      'Metal experimental finlandais, nappes abrasives et rythmiques extremes sous le dome geodesique.',
    image: 'event_2.png',
  },
  {
    slug: 'atelier-thermique',
    title: 'Atelier textile thermique',
    artist: 'Nord Atelier',
    type: 'STAND',
    category: 'Stands',
    genre: 'Atelier',
    origin: 'FR',
    day: 'DIM',
    startsAt: '2027-01-26T12:00:00+01:00',
    endsAt: '2027-01-26T17:00:00+01:00',
    location: 'Village des stands',
    latitude: 49.7617,
    longitude: 4.7193,
    description:
      'Decouverte de materiaux thermiques, accessoires reutilisables et conseils pour affronter les zones froides.',
    image: 'event_1.png',
  },
  {
    slug: 'king-vibe',
    title: 'King Vibe',
    artist: 'King Vibe',
    type: 'CONCERT',
    category: 'Concerts',
    genre: 'Experimental Noise',
    origin: 'NO',
    day: 'DIM',
    startsAt: '2027-01-26T02:00:00+01:00',
    endsAt: '2027-01-26T03:30:00+01:00',
    location: 'Sanctuaire de Glace',
    latitude: 49.7621,
    longitude: 4.7185,
    description:
      'King Vibe orchestre un chaos de frequences brutes, entre noise experimental et vibrations physiques.',
    image: 'event_2.png',
    featured: true,
  },
  {
    slug: 'aurora',
    title: 'Aurora',
    artist: 'Aurora',
    type: 'CONCERT',
    category: 'Concerts',
    genre: 'Ambient Cosmique',
    origin: 'NO',
    day: 'DIM',
    startsAt: '2027-01-26T04:00:00+01:00',
    endsAt: '2027-01-26T05:30:00+01:00',
    location: 'Sanctuaire de Glace',
    latitude: 49.7621,
    longitude: 4.7185,
    description:
      'Ambient cosmique et longues nappes lumineuses pour accompagner les dernieres heures de la nuit.',
    image: 'event_1.png',
  },
  {
    slug: 'degel',
    title: 'Degel',
    artist: 'Degel',
    type: 'CONCERT',
    category: 'Concerts',
    genre: 'Live Techno',
    origin: 'FR',
    day: 'DIM',
    startsAt: '2027-01-26T06:00:00+01:00',
    endsAt: '2027-01-26T07:30:00+01:00',
    location: 'Scene Glacier',
    latitude: 49.763,
    longitude: 4.7202,
    description:
      'Un live techno progressif qui marque la fin du festival et le retour de la lumiere sur Fatal Fields.',
    image: 'event_3.png',
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function upsert(
  strapi: Core.Strapi,
  uid: string,
  where: Record<string, unknown>,
  data: Record<string, unknown>,
) {
  const query = strapi.db.query(uid as never);
  const existing = await query.findOne({ where });

  if (existing) {
    return query.update({ where: { id: existing.id }, data });
  }

  return query.create({ data });
}

async function uploadSeedAsset(strapi: Core.Strapi, filename: string, alternativeText: string) {
  const uploadService = strapi.plugin('upload').service('upload');
  const existing = await uploadService.findMany({ filters: { name: filename } });

  if (existing.length > 0) return existing[0];

  const filepath = path.join(process.cwd(), 'seed-assets', filename);
  const stat = fs.statSync(filepath);
  const ext = path.extname(filename).toLowerCase();
  const mimetype = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
  const [uploaded] = await uploadService.upload({
    data: {
      fileInfo: {
        name: filename,
        alternativeText,
      },
    },
    files: [
      {
        filepath,
        originalFilename: filename,
        newFilename: filename,
        mimetype,
        size: stat.size,
      },
    ],
  });

  return uploaded;
}

async function ensureFrontendApiToken(strapi: Core.Strapi) {
  const tokenService = strapi.service('admin::api-token' as never) as {
    getByName: (
      name: string,
      options?: { includeDecryptedKey?: boolean },
    ) => Promise<{ accessKey?: string } | null>;
    create: (data: {
      name: string;
      description: string;
      type: 'read-only';
      lifespan: null;
    }) => Promise<{ accessKey: string }>;
  };
  const name = 'Naked Fest Frontend';
  const existing = await tokenService.getByName(name, { includeDecryptedKey: true });
  const token =
    existing?.accessKey ??
    (
      await tokenService.create({
        name,
        description: 'Read-only token used by the Naked Fest Next.js frontend.',
        type: 'read-only',
        lifespan: null,
      })
    ).accessKey;

  const outputPath = path.join(process.cwd(), '.tmp', 'frontend-api-token');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, token, { encoding: 'utf8', mode: 0o600 });
}

export async function seedContent(strapi: Core.Strapi) {
  const obsoleteTestEvent = await strapi.db.query('api::event.event').findOne({
    where: { slug: 'event', title: 'test' },
  });
  if (obsoleteTestEvent) {
    await strapi.db.query('api::event.event').delete({
      where: { id: obsoleteTestEvent.id },
    });
  }

  const media = {
    'event_1.png': await uploadSeedAsset(strapi, 'event_1.png', 'Artiste sur la scene Glacier'),
    'event_2.png': await uploadSeedAsset(strapi, 'event_2.png', 'Performance live au Naked Fest'),
    'event_3.png': await uploadSeedAsset(strapi, 'event_3.png', 'Performance dans la Zone Cryo'),
    hero: await uploadSeedAsset(strapi, 'homepage-hero.jpg', 'Naked Fest Winter 27'),
    map: await uploadSeedAsset(strapi, 'homepage-map.png', 'Carte de Fatal Fields'),
  };

  const categories = new Map<string, any>();
  const genres = new Map<string, any>();
  const locations = new Map<string, any>();
  const artists = new Map<string, any>();
  const seededEvents = new Map<string, any>();

  for (const item of events) {
    const category = await upsert(
      strapi,
      'api::event-category.event-category',
      { slug: slugify(item.category) },
      { name: item.category, slug: slugify(item.category) },
    );
    categories.set(item.category, category);

    const genre = await upsert(
      strapi,
      'api::music-genre.music-genre',
      { slug: slugify(item.genre) },
      { name: item.genre, slug: slugify(item.genre) },
    );
    genres.set(item.genre, genre);

    const location = await upsert(
      strapi,
      'api::location.location',
      { slug: slugify(item.location) },
      {
        name: item.location,
        slug: slugify(item.location),
        type: item.location === 'Village des stands' ? 'STAND' : 'STAGE',
        address,
        latitude: item.latitude,
        longitude: item.longitude,
      },
    );
    locations.set(item.location, location);

    const event = await upsert(
      strapi,
      'api::event.event',
      { slug: item.slug },
      {
        title: item.title,
        slug: item.slug,
        description: item.description,
        type: item.type,
        status: 'PUBLISHED',
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        day: item.day,
        origin: item.origin,
        isFeatured: item.featured ?? false,
        image: media[item.image].id,
        category: category.id,
        genre: genre.id,
        location: location.id,
      },
    );
    seededEvents.set(item.slug, event);

    for (const [index, participantName] of [item.artist, ...(item.speakers ?? [])].entries()) {
      const participantSlug = slugify(participantName);
      const artist = await upsert(
        strapi,
        'api::artist.artist',
        { slug: participantSlug },
        {
          name: participantName,
          slug: participantSlug,
          type: item.type === 'CONFERENCE' || index > 0 ? 'SPEAKER' : 'ARTIST',
        },
      );
      artists.set(participantSlug, artist);

      await upsert(
        strapi,
        'api::event-artist.event-artist',
        { event: event.id, artist: artist.id },
        {
          event: event.id,
          artist: artist.id,
          role: index === 0 ? 'Principal' : 'Intervenant',
          order: index,
        },
      );
    }
  }

  const homePageData = {
    heroEyebrow: '24 - 26 Jan 2027',
    title: 'Naked Fest',
    edition: 'Winter 27',
    tagline: 'La liberation par le froid & le son',
    locationLabel: 'Fatal Fields - Ardennes, France',
    heroImage: media.hero.id,
    features: [
      {
        icon: '/Icon_song.svg',
        iconAlt: 'Musique',
        title: 'Musique Extreme',
        description:
          'Techno industrielle, Metal experimental, Noise radicale. Un mur de son contre le gel.',
      },
      {
        icon: '/Icon_human.svg',
        iconAlt: 'Liberte',
        title: 'Liberte Totale',
        description:
          "L'experience nudiste ultime en environnement hostile. Brisez les chaines du vetement.",
      },
      {
        icon: '/Icon_cold.svg',
        iconAlt: 'Froid',
        title: 'Froid Radical',
        description: "-6 C en moyenne. Le choc thermique comme catalyseur d'adrenaline pure.",
      },
    ],
    stats: [
      { value: '03', label: 'Nuits Blanches', color: 'lime' },
      { value: '-06 C', label: 'Temperature Min', color: 'pink' },
      { value: '48H', label: 'Set Non-Stop', color: 'cyan' },
      { value: 'INFINI', label: 'Chaleur Humaine', color: 'lime' },
    ],
    featuredEvents: events
      .filter((item) => item.featured)
      .map((item) => seededEvents.get(item.slug).id),
    mapTitle: 'Fatal Fields',
    mapSubtitle: 'Explorez le territoire du vide',
    mapDescription:
      'Un domaine de 50 hectares dans les Ardennes transforme en zone de liberte radicale. 5 scenes, 2 bars thermiques, 1 sanctuaire de glace, 1 station ski, 1 igloo VIP.',
    mapImage: media.map.id,
    practicalInfos: [
      {
        number: '01',
        color: 'lime',
        title: 'Lieu & Acces',
        body: 'Foret des Ardennes, France. Navettes depuis Charleville-Mezieres toutes les heures. Parkings securises.',
      },
      {
        number: '02',
        color: 'pink',
        title: 'Charte Nudiste',
        body: "Nudite obligatoire sur l'ensemble du site (exceptions meteo extremes signalees). Respect absolu, zero photo.",
      },
      {
        number: '03',
        color: 'cyan',
        title: 'Equipement',
        body: 'Prevoyez des peaux de betes synthetiques pour les deplacements. Zones chauffees a 25 C disponibles 24/7.',
      },
      {
        number: '04',
        color: 'violet',
        title: 'Securite',
        body: 'Equipe medicale specialisee en hypothermie. Safe zones presentes sur chaque scene.',
      },
    ],
  };

  const homeQuery = strapi.db.query('api::home-page.home-page');
  const existingHomePage = await homeQuery.findOne({});
  if (existingHomePage) {
    await homeQuery.update({ where: { id: existingHomePage.id }, data: homePageData });
  } else {
    await homeQuery.create({ data: homePageData });
  }

  await ensureFrontendApiToken(strapi);
  strapi.log.info(`[seed] ${events.length} events and homepage content are ready.`);
}
