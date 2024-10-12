type TrueOfFalse = A extends B ? true : false;

// A extends B -> Is A assignable to B

//type T = true ? true : false
//type T = 2 extends number;
type T = 2 extends number ? true : false;

type IsMiddleAged<N> = N extends 42 ? true : false;

type OK = IsMiddleAged<42>;
type KO = IsMiddleAged<40>;

type If<A extends boolean, B, C> = A extends true ? B : C;

type a = If<true, number, string>;
type b = If<false, {}, []>;
type c = If<never, number, string>;
//type d = If<"blablabla", number, string>

const buildUser = <S extends string>(name: S) => ({ name });

const userExample = buildUser("Jack"); //{name: Jack}

const inferAsTuple = <T extends [unknown, ...unknown[]]>(tuple: T) => tuple;

const t1 = inferAsTuple([1, 2]); // number[]
const t2 = inferAsTuple(["b", 3, false]);

// Nested Conditions
// type GetColor<I> = I extends 0
//   ? "black"
//   : I extends 1
//   ? "blue"
//   : I extends 2
//   ? "red"
//   : "white";

type GetColor<I extends 0 | 1 | 2 | 3> = {
  0: "black";
  1: "blue";
  2: "red";
  3: "white";
}[I];

type IsUser<T> = T extends { name: string; age: number } ? true : false;

type iu1 = IsUser<{ name: "Jack" }>;
type iu2 = IsUser<{ name: "Jack"; age: 26 }>;

type IsUser2<T> = T extends { name: string; team: { memberCount: number } }
  ? true
  : false;

type T1 = IsUser2<{
  name: "Jack";
  team: {
    memberCount: 12;
    name: "redders"; // <- extra prop
  };
}>;

type T2 = IsUser2<{ name: "Jackson" }>;

type Plan = "basic" | "pro" | "premium";
type Role = "viewer" | "editor" | "admin";

// branching on several types by wrapping
// them in a tuple:
type CanEdit<P extends Plan, R extends Role> = [P, R] extends [
  "pro" | "premium",
  "editor" | "admin"
]
  ? true
  : false;

type PR1 = CanEdit<"basic", "editor">;
type PR2 = CanEdit<"pro", "editor">;

//{ name: string; role: any }
type GetRole<User> = User extends { name: string; role: infer Role }
  ? Role
  : never;

type GR1 = GetRole<{ name: "Jack"; role: "Admin" }>;
type GR2 = GetRole<{ name: "Melissa" }>;

type Head<Tuple> = Tuple extends [infer First, ...any] ? First : never;

type h1 = Head<["a1", "a2", "a3"]>;
type h2 = Head<[]>;

type Tail<Tuple> = Tuple extends [any, ...infer Rest] ? Rest : [];

type t1 = Tail<["a1", "a2", "a3"]>;
type t2 = Tail<["a1"]>;
type t3 = Tail<[]>;

type FirstAndLast<Tuple> = Tuple extends [infer Frist, ...any[], infer Last]
  ? [Frist, Last]
  : [];

type fal1 = FirstAndLast<[1]>;
type fal2 = FirstAndLast<[1, 2]>;
type fal3 = FirstAndLast<[1, 2, 3, 4]>;

//This type
type IsEqual = (a: number, b: number) => boolean;
//contains the same type info as this one
// contains the same type-level information as this one
// type IsEqual = {
//   inputs: [a: number, b: number];
//   output: boolean;
// };

type Parameters2<F> = F extends (...params: infer P) => any ? P : never;

type Fn = (name: string, id: number) => boolean;

type P1 = Parameters2<Fn>;

type ReturnType2<F> = F extends (...params: any[]) => infer R ? R : never;

type R1 = ReturnType2<Fn>;

type SetValue<S> = S extends Set<infer V> ? V : never;

type SV1 = SetValue<Set<number>>;

type MyGeneric<A, B> = { content: A; children: B[] };

type ExtractParams<S> = S extends MyGeneric<infer A, infer B> ? [A, B] : never;

type EP1 = ExtractParams<MyGeneric<number, string>>;

// type Fn<I> = SuperExpensiveComputation<I> extends infer Result
//   ? [Result, Result, Result]
//   : never;
