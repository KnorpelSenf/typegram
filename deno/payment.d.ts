import { Integer, String } from "./alias.d.ts";
import { User } from "./manage.d.ts";

/** This object represents a portion of the price for goods or services. */
export interface LabeledPrice {
  /** Portion label */
  label: String;
  /** Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  amount: Integer;
}

/** This object contains basic information about an invoice. */
export interface Invoice {
  /** Product name */
  title: String;
  /** Product description */
  description: String;
  /** Unique bot deep-linking parameter that can be used to generate this invoice */
  start_parameter: String;
  /** Three-letter ISO 4217 currency code */
  currency: String;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: Integer;
}

/** This object represents a shipping address. */
export interface ShippingAddress {
  /** ISO 3166-1 alpha-2 country code */
  country_code: String;
  /** State, if applicable */
  state: String;
  /** City */
  city: String;
  /** First line for the address */
  street_line1: String;
  /** Second line for the address */
  street_line2: String;
  /** Address post code */
  post_code: String;
}

/** This object represents information about an order. */
export interface OrderInfo {
  /** User name */
  name?: String;
  /** User's phone number */
  phone_number?: String;
  /** User email */
  email?: String;
  /** User shipping address */
  shipping_address?: ShippingAddress;
}

/** This object represents one shipping option. */
export interface ShippingOption {
  /** Shipping option identifier */
  id: String;
  /** Option title */
  title: String;
  /** List of price portions */
  prices: LabeledPrice[];
}

/** This object contains basic information about a successful payment. */
export interface SuccessfulPayment {
  /** Three-letter ISO 4217 currency code */
  currency: String;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: Integer;
  /** Bot specified invoice payload */
  invoice_payload: String;
  /** Identifier of the shipping option chosen by the user */
  shipping_option_id?: String;
  /** Order info provided by the user */
  order_info?: OrderInfo;
  /** Telegram payment identifier */
  telegram_payment_charge_id: String;
  /** Provider payment identifier */
  provider_payment_charge_id: String;
}

/** This object contains information about an incoming shipping query. */
export interface ShippingQuery {
  /** Unique query identifier */
  id: String;
  /** User who sent the query */
  from: User;
  /** Bot specified invoice payload */
  invoice_payload: String;
  /** User specified shipping address */
  shipping_address: ShippingAddress;
}

/** This object contains information about an incoming pre-checkout query. */
export interface PreCheckoutQuery {
  /** Unique query identifier */
  id: String;
  /** User who sent the query */
  from: User;
  /** Three-letter ISO 4217 currency code */
  currency: String;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: Integer;
  /** Bot specified invoice payload */
  invoice_payload: String;
  /** Identifier of the shipping option chosen by the user */
  shipping_option_id?: String;
  /** Order info provided by the user */
  order_info?: OrderInfo;
}
