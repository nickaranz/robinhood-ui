export interface IPageCollection {
    next: string,
    previous: string,
    results: Array<any>;
}
export interface IAccount {
    account_number: string;
    buying_power: number;
    can_downgrade_to_cash: string;//url
    cash: number;
    cash_available_for_withdrawal: number;
    cash_balances: number;
    cash_held_for_orders: number;
    created_at: Date;
    deactivated: boolean;
    deposit_halted: boolean;
    instant_eligibility: Object;
    margin_balances: Object;
    max_ach_early_access_amount: number;
    only_position_closing_trades: boolean;
    portfolio: string;//url
    positions: string;//url
    sma: number;
    sma_held_for_orders: number;
    sweep_enabled: boolean;
    type: string; // margin, .. 
    uncleared_deposits: number;
    unsettled_debit: number;
    unsettled_funds: number;
    updated_at: Date;
    url: string;
    user: string; //url
    withdrawal_halted: boolean;
}
export interface IPositionRaw {
    account: string;//url
    average_buy_price: number;
    created_at: string;
    instrument: string;//url
    intraday_average_buy_price: number;
    intraday_quantity: number;
    quantity: number;
    shares_held_for_buys: number;
    shares_held_for_sells: number;
    shares_held_for_stock_grants: number;
    updated_at: string;
    url: string;//url
}
export interface IInstrument extends IQuote {
    bloomberg_unique: string;
    country: string;
    day_trade_ratio: number;
    fundamentals: string; //url
    id: string;
    list_date: Date;
    maintenance_ratio: number;
    margin_initial_ratio: number;
    market: string;//url
    min_tick_size: string;
    name: string;
    quote: string;//url
    simple_name: string;
    splits: string;//url
    state: string;
    symbol: string;
    tradeable: boolean;
    url: string;
}
export interface IQuote {
    adjusted_previous_close: number;
    ask_price: number;
    ask_size: number;
    bid_price: number;
    bid_size: number;
    has_traded: boolean;
    instrument: string; //url
    last_extended_hours_trade_price: number;
    last_trade_price: number;
    last_trade_price_source: string;
    previous_close: number;
    previous_close_date: Date;
    symbol: string;
    trading_halted: false;
    updated_at: Date;
}
export interface IPosition {
    account: IAccount;//url
    average_buy_price: number;
    created_at: Date;
    instrument: IInstrument;//url
    intraday_average_buy_price: number;
    intraday_quantity: number;
    quantity: number;
    shares_held_for_buys: number;
    shares_held_for_sells: number;
    shares_held_for_stock_grants: number;
    updated_at: Date;
    url: string;//url
    equity: number;
    total: {
        return: number,
        percentage: number

    };
}
export interface IAccountResponse extends IPageCollection {
    results: Array<IAccount>
}
export interface IPositionsResponse extends IPageCollection {
    results: Array<IPosition>
}
