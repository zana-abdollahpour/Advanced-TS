type Empty = [];
type One = [1];
type Two = [1, "2"]; // types can be different!
type Three = [1, "2", 1]; // tuples can contain duplicates

type SomeTuple = ["Jack", 26, false];

type Name = SomeTuple[0];
type Age = SomeTuple[1];

type User5 = { name: string; age: number; isAdmin: true };

type NameOrAge2 = User5["name" | "age"];

type NameOrAge3 = SomeTuple[0 | 1];
type Values = SomeTuple[number];

type TupleKeys = keyof SomeTuple; //"0" | "1" | "2" | "map" ...

// type Tuple1 = [4, 5]
// type Tuple2 = [1,2,3, ... Tuple1]

type Tuple1 = [1, 2, 3];
type Tuple2 = [4, 5];

type Tuple3 = [...Tuple1, ...Tuple2];

type UserType = [firstname: string, lastname: string];

type OptTuple = [string, number?];

const tuple1: OptTuple = ["Jack", 23];
const tuple2: OptTuple = ["Jack"];
const tuple3: OptTuple = ["Jack", undefined];

type Tags = string[];

type Users = Array<User>; // same as `User[]`

type Bits = (0 | 1)[];

type SomeArray = boolean[];

type Content = SomeArray[number];

// number[] that starts with 0
type PhoneNumber = [0, ...number[]];

// string[] that ends with a `!`
type Exclamation = [...string[], "!"];

// non-empty list of strings
type NonEmpty = [string, ...string[]];

// starts and ends with a zero
type Padded = [0, ...number[], 0];

type FrenchSocialSecurityNumber = [1 | 2, ...number[]];

type UserTuple = [name: string, age?: number, ...addresses: string[]];

function createUser(...args: UserTuple) {
  const [name, age, ...addresses] = args;
}

createUser("Jack", 23, "5th Main Ave", "7500 Eastway US"); // ✅
createUser("Alice"); // ✅ `age` is optional and addresses can be empty.
createUser("Branda", 0, false);
//                     ~~~~~ ❌ not a `string`!

function updateUser(user: User, ...args: UserTuple) {}

type Name2 =
  | [first: string, last: string]
  | [first: string, middle: string, last: string];

function createUser3(...name: Name2) {}

createUser3("Jack", "DoDo");
createUser3("Jack", "BlaBla", "DoDo");
