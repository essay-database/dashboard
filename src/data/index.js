import faker from "faker";
import universities from "./universities.json";
import images from "./picsum";

const TAGS = ["new", "featured", "popular"];
const UNIVERSITIES = universities.map(({ institution }) => institution);
const APPLICATION_STATUS = ["accepted", "rejected", "waitlisted", "pending"];

const getTag = () => faker.random.arrayElement(TAGS);
const getImageIndex = (isSmall = true) =>
  faker.random.arrayElement(images.map(img => img.id));
const getYear = () => faker.date.past(20, new Date()).getFullYear();
const getStatus = () => faker.random.arrayElement(APPLICATION_STATUS);
const getCollege = () => faker.random.arrayElement(UNIVERSITIES);

const getData = num =>
  Array.from(new Array(num), () => [
    faker.random.uuid(),
    faker.lorem
      .paragraphs(faker.random.number({ min: 5, max: 15 }))
      .substring(0, 20) + "...",
    faker.lorem.sentences(2).substring(0, 20) + "...",
    getCollege(),
    getYear(),
    getStatus(),
    faker.name.findName(),
    faker.internet.email(),
    faker.address.country(),
    faker.address.state(),
    getTag(),
    getImageIndex(),
    faker.date.recent(60).toDateString(),
    faker.internet.url(),
    faker.lorem.paragraph().substring(0, 20) + "..."
  ]);

export const columns = [
  "id",
  "essay",
  "prompt",
  "college",
  "year",
  "status",
  "name",
  "email",
  "country",
  "state",
  "tag",
  "image",
  "date",
  "source",
  "comments"
];

export default getData;
