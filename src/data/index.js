import faker from "faker";
import universities from "./universities.json";
import images from "./picsum";
import countries from "./countries.json";
import states from "./states.json";

const UNIVERSITIES = universities.map(({ institution }) => institution);
const STATUSES = ["accepted", "rejected", "waitlisted", "pending"];
const STATES = states.map(({ name }) => name);
const COUNTRIES = countries.map(({ name }) => name);

const getImageIndex = () =>
  faker.random.arrayElement(images.map(img => img.id));
const getYear = () => faker.date.past(20, new Date()).getFullYear();
const getStatus = () => faker.random.arrayElement(STATUSES);
const getCollege = () => faker.random.arrayElement(UNIVERSITIES);

//  String or Number types
const getData = num =>
  Array.from(new Array(num), () => [
    faker.random.uuid(),
    faker.lorem.paragraphs(faker.random.number({ min: 5, max: 15 })),
    faker.lorem.sentences(2),
    getCollege(),
    getYear(),
    getStatus(),
    faker.name.findName(),
    faker.internet.email(),
    faker.address.country(),
    faker.address.state(),
    faker.random.boolean().toString(),
    getImageIndex(),
    faker.date.recent(60).toDateString(),
    faker.internet.url(),
    faker.lorem.paragraph(),
    faker.random.number({ min: 0, max: 100 })
  ]);

export const years = Array.from(
  Array(20),
  (_, idx) => new Date().getFullYear() - idx
);

export { UNIVERSITIES as colleges };
export { STATUSES as statuses };
export { COUNTRIES as countries };
export { STATES as states };

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
  "featured",
  "image",
  "date",
  "source",
  "comments",
  "views"
];

export default getData;
