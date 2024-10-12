// type SomeObject = { key1: boolean; key2: number };

// type SomeRecord = { [key: string]: number };

// type FourKindsOfDataStructures =
//   | { key1: boolean; key2: number } // objects
//   | { [key: string]: number } // records
//   | [boolean, number] // tuples
//   | number[]; // arrays

type User = {
  name: string;
  age: number;
  isAdmin: boolean;
};

type Keys = keyof User; // "name" | "age" | "isAdmin"
// type UserValues = User[keyof User]

type ValueOf<Obj> = Obj[keyof Obj];

type UserValues = ValueOf<User>;

// type NameOrAge = User["name" | "age"]
type NameOrAge = User["name"] | User["age"];

// type Age = User["age"];
// type Role = User["isAdmin"]

// ✅ this object is in the `User` set.
const gabriel: User = {
  name: "Gabriel",
  isAdmin: true,
  age: 28,
};

const justAKindUser = {
  name: "john",
  username: "...", // <- extra property
  age: 43,
  isAdmin: false,
};

const john: User = justAKindUser;

type BlogPost = { title: string; tags?: string[] };
//                                   ^ this property is optional!

const blogPost1: BlogPost = { title: "hellooo" };

const blogPost2: BlogPost = {
  title: "hiii",
  tags: ["#hi", "ksdjfhjkd"],
};

type WithName = { name: string };
type WithAge = { age: number };
type WithRole = { isAdmin: boolean };

type User2 = WithName & WithAge & WithRole;
type Company = WithName & WithAge;

type KeyOfUser2 = keyof User2;

interface User4 extends WithName, WithAge, WithRole {}
interface Company2 extends WithName, WithAge {}

// type A = { a: string };
// type KeyOfA = keyof A; // => 'a'

// type B = { b: number };
// type KeyOfB = keyof B; // => 'b'

// type C = A & B;
// type KeyOfC = keyof C; // => 'a' | 'b'

type A = { a: string; c: boolean };
type KeyOfA = keyof A; // => 'a' | 'c'

type B = { b: number; c: boolean };
type KeyOfB = keyof B; // => 'b' | 'c'

type C = A | B;
type KeyOfC = keyof C;

/*** The general rule is:
 *
 *     keyof (A & B) = (keyof A) | (keyof B)
 *     keyof (A | B) = (keyof A) & (keyof B)
 *
 ***/

type WithName2 = { name: string; id: string };
type WithAge2 = { age: number; id: number };
type User3 = WithName2 & WithAge2;

type Id = User3["id"]; // => string & number <=> never

//type RecordOfBools = {[key: string]: boolean};

type RecordOfBools = Record<string, boolean>;

//type State = Record<"valid" | "editted" | "focused", boolean>;

type State = { valid: boolean; editted: boolean; focused: boolean };

type ValueType = RecordOfBools[string];

type Props = { value: string; focused: boolean; edited: boolean };
type Props2 = { value: string; focused?: boolean; edited: boolean };

type PartialProps = Partial<Props>;
type RequiredPops = Required<Props2>;

type ValueProps = Pick<Props, "value">;
type SomeProps = Pick<Props, "edited" | "focused">;

type ValueProps2 = Omit<Props, "value">;
type OtherProps = Omit<Props, "value" | "focused">;
