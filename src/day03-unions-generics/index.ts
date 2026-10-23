// Day 3 — Union types, narrowing, generics, typing functions
// Run:   npx tsx src/day03-unions-generics/index.ts
// Check: npm run typecheck

// STEP 1: Create a type `OrderStatus` that allows only:
//   "pending", "paid", "shipped", "cancelled"
type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

// STEP 2: Create a discriminated union `Payment` with 3 shapes:
//   { method: "card";   last4: string }
//   { method: "paypal"; email: string }
//   { method: "cod" }                      (cash on delivery, no extra field)
type Payment = 
  | { method: "card"; last4: string }
  | { method: "paypal"; email: string }
  | { method: "cod" };

// STEP 3: Create an interface `Order` with:
//   id       -> number
//   customer -> string
//   total    -> number
//   status   -> OrderStatus
//   payment  -> Payment
interface Order {
    id: number;
    customer: string;
    total: number;
    status: OrderStatus;
    payment: Payment;
}

// STEP 4: Create `orders: Order[]` with 3 orders.
// Use a DIFFERENT payment method in each one.
const orders: Order[] = [
    {
        id: 1,
        customer: "Ali",
        total: 40,
        status: "paid",
        payment: { method: "card", last4: "4242" }
    },
    {
        id: 2,
        customer: "Sara",
        total: 60,
        status: "pending",
        payment: { method: "paypal", email: "ali@example.com" }
    },
    {
        id: 3,
        customer: "Ahmed",
        total: 80,
        status: "shipped",
        payment: { method: "cod" }
    }
];


// STEP 5: Write `describePayment(p: Payment): string` using a switch on p.method.
//   card   -> "Card ending 4242"
//   paypal -> "PayPal (ali@example.com)"
//   cod    -> "Cash on delivery"
function describePayment(p: Payment): string {
    switch (p.method) {
        case "card":
            return `Card ending ${p.last4}`;
        case "paypal":
            return `PayPal (${p.email})`;
        case "cod":
            return "Cash on delivery";
        default:
            return "Unknown payment method";
    }
}


// STEP 6: Write a GENERIC function `firstItem<T>(list: T[]): T | undefined`
// that returns the first item of any array.
// Test it: firstItem(orders) and firstItem(["S", "M"]).
function firstItem<T>(list: T[]): T | undefined {
    return list[0];
}


// STEP 7: Write `formatId(id: string | number): string` that uses NARROWING:
//   number -> "#1001"            (add a #)
//   string -> the string in UPPERCASE
// Hint: typeof id === "number"
function formatId(id: string | number): string {
    if (typeof id === "number") {
        return `#${id}`;
    } else {
        return id.toUpperCase();
    }
}


// STEP 8: Loop over orders and log one line each, e.g.
//   "#1 Ali - $40 - paid - Card ending 4242"
// Use formatId and describePayment inside it.
for (const order of orders) {
    console.log(`#${order.id} ${order.customer} - $${order.total} - ${order.status} - ${describePayment(order.payment)}`);
}

// BONUS:
//   - Add a new payment method { method: "giftcard"; code: string } to Payment
//     and run `npm run typecheck`. Does TypeScript complain about your switch?
//     (Then handle the new case.)
//   - Write `countByStatus(orders: Order[], status: OrderStatus): number`.
