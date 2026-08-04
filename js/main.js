const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Елена',
  'Максим',
  'Анна',
  'Дмитрий',
  'Ольга',
  'Сергей',
  'Наталья',
  'Алексей',
  'Екатерина',
  'Михаил',
  'София',
  'Павел',
];

const DESCRIPTIONS = [
  'Закат над морем',
  'Утро в горах',
  'Прогулка по старому городу',
  'Кот смотрит в окно',
  'Летний пикник в парке',
  'Дорога через лес',
  'Первый снег',
  'Чашка кофе на подоконнике',
  'Ночной город в огнях',
  'Цветущее поле',
  'Волны на побережье',
  'Вид с вершины',
  'Дождливый день',
  'Уличный музыкант',
  'Тихое озеро',
  'Велосипедная прогулка',
  'Радуга после дождя',
  'Домик в деревне',
  'Солнечный двор',
  'Поездка к водопаду',
  'Зимний лес',
  'Песчаный пляж',
  'Облака над городом',
  'Вечерняя набережная',
  'Завтрак на террасе',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_POST_COUNT = 25;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const MIN_AVATAR_POSITION = 1;
const MAX_AVATAR_POSITION = 6;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_MESSAGE_LENGTH = 1;
const MAX_MESSAGE_LENGTH = 2;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

let currentCommentId = 1;

const createMessage = () => {
  const messageCount = getRandomInteger(MIN_MESSAGE_LENGTH, MAX_MESSAGE_LENGTH);
  const firstMessage = getRandomArrayElement(MESSAGES);

  if (messageCount === 1) {
    return firstMessage;
  }

  let secondMessage = getRandomArrayElement(MESSAGES);

  while (firstMessage === secondMessage) {
    secondMessage = getRandomArrayElement(MESSAGES);
  }

  return `${firstMessage} ${secondMessage}`;
};

const createComment = () => ({
  id: currentCommentId++,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_POSITION, MAX_AVATAR_POSITION)}.svg`,
  name: getRandomArrayElement(NAMES),
  message: createMessage(),
});

const generateComments = () => {
  const comments = [];
  const commentCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);

  for (let i = 0; i < commentCount; i++) {
    comments.push(createComment());
  }

  return comments;
};

const createPost = (_, index) => {
  const postId = index + 1;

  return {
    id: postId,
    url: `photos/${postId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: generateComments()
  };
};

const similarPosts = Array.from({length: SIMILAR_POST_COUNT}, createPost);
