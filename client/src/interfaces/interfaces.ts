

// Modules
import { Types } from 'mongoose';
import React, { JSX } from 'react';

export interface i_auth_login_fields { email: string; password: string; };

export interface i_handle_login_fields_results { valid: boolean; error: string; field: string; };

export interface i_user_creation { 
    _id?: Types.ObjectId; 
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    type: Number;
    phoneNumber: string;
    businessName: string;
    city: string;
    province: string;
    timestamp: number;
}

// Home Page

export interface i_models_slider { image: string; title: string; link: string; }

export interface i_hero_slider_props { images: string[]; }

export interface i_modelCardProps { 
    image: string; 
    title: string; 
    link?: string;
    t1: string;
    p1: string;
    t2: string;
    p2: string;
    t3: string;
    p3: string;
    t4: string;
    p4: string;
 }

export interface i_featuresCards_props { icon: JSX.Element; title: string; description: string;}

// Login Page

export interface i_login_form_props { 
    error: {
        email?: string;
        password?: string;
        first_name?: string;
        last_name?: string;
        allFields?: string;
    };
    clearErrors: () => void;
    callback: () => void;
    email: string;
    password: string;
    placeholderEmail: string;
    placeholderPword: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setPlaceholderEmail: (value: string) => void;
    setPlaceholderPword: (value: string) => void;
}

// Main

export interface i_button_props { children: React.ReactNode;  onClick?: () => void; customStyle?: React.CSSProperties; }
export interface i_btn_card_props { image: string; title: string;  onClick?: () => void; customDivStyle?: React.CSSProperties; customImageStyle?: React.CSSProperties; customTextStyle?: React.CSSProperties; };

// Contact Page

export interface i_contact_form_props {
    form: i_contact_form_data;
    setForm: React.Dispatch<React.SetStateAction<i_contact_form_data>>;
    placeholderFirstName: string;
    placeholderLastName: string;
    placeholderPhone: string;
    placeholderEmail: string;
    placeholderBusinessName: string;
    placeholderTown: string;
    placeholderProvince: string;
    placeholderMessage: string;
    setPlaceholderFirstName: (value: string) => void;
    setPlaceholderLastName: (value: string) => void;
    setPlaceholderPhone: (value: string) => void;
    setPlaceholderEmail: (value: string) => void;
    setPlaceholderBusinessName: (value: string) => void;
    setPlaceholderTown: (value: string) => void;
    setPlaceholderProvince: (value: string) => void;
    setPlaceholderMessage: (value: string) => void;
    error: {
        first_name?: string;
        last_name?: string;
        phone_number?: string;
        email?: string;
        business_name?: string;
        town?: string;
        province?: string;
        message?: string;
    };
    setError: (error: { [key: string]: string }) => void;
    clearErrors: () => void;
    callback: (e: React.FormEvent) => Promise<void>;
    api_error: { type: string; message: string; };
    actionConfirmedMsg: boolean;
    setActionConfirmedMsg: (value: boolean) => void;
    setApiError: (error: { type: string; message: string }) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
};

export interface i_contact_form_data {
    first_name: string;
    last_name: string;
    phone_number: string;
    business_name: string;
    town: string;
    province: string;
    email: string;
    emailSubject: string;
    message: string;
    website?: string; // spam trap, stays empty for real visitors
}

// Cart.models
export interface i_cart_models_props {
    headerBgImage?: string;
    altProp?: string;
    headerCartImage?: string;
    headerIsElite?: boolean;
    headerTitle?: string;
    chooseModelsH2?: string;
    buttonCards?: { image: string; title: string }[];
    currentModelIndex?: number;
    onModelChange?: (index: number) => void;
    p_4wd_available?: string;
    modelsTitle?: string[];
    modelsImages?: string[][];
    lists?: any[];
    colorPickerH3?: string;
    colorPickerP?: string;
    features?: { image: string; title: string; description: string }[];
    discoverShadowTitleImg?: string;
    discoverh2Span?: string;
    discoverh2?: string;
    h2_discoverNext?: string;
    discoverP?: string;
    discoverMontageImage?: string;
    specTitles?: string[];
    specContents?: string[][];
    shrinkGrowItems?: { image: string; title: string; paragraph: string }[][];
    isClassicPage?: boolean;
    isLuxorPage?: boolean;
};

// videoShowcase.tsx
export interface i_videoCapsule {
    id?: number;
    title: {
        en: string;
        fr: string;
    };
    description?: {
        en: string | null;
        fr: string | null;
    };
    videoUrl: string;
};


// Components
export interface i_cart_features_props { image: string; title: string; description: string; }
export interface i_choose_model_card_props { image: string; list: string[]; }
export interface i_collapsing_dropdown_props { title: string[]; children: React.ReactNode; isOpen: boolean; onToggle: () => void; }
export interface i_dropdown_props { title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void; }
export interface i_shrinkGrow_props { image: string; title: string; paragraph?: string; }


