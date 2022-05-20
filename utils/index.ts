import moment from 'moment';
import { v4 as UUIDV4 } from 'uuid'
export const setClass = (...args: any[]) => {
 return args.join(" ")
}



export function validateEmail(email: string): {
    message: string;
    hasError: boolean;
} {
    const errors: { message: string, hasError: boolean} = {
        message: '',
        hasError: false
    }
    if (!email) {
        errors.message = 'Email is required'
        errors.hasError = true
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.message = 'Invalid email address'
        errors.hasError = true
    }
    return errors
}
export function validatePassword(password: string): {
    message: string;
    hasError: boolean;
} {
    const errors: { message: string, hasError: boolean} = {
        message: '',
        hasError: false
    }
    if (!password) {
        errors.message = 'Password is required'
        errors.hasError = true
    }
    if (password && password.length < 6) {
        errors.message = 'Password must be at least 6 characters'
        errors.hasError = true
    }
    return errors
}




export function validate(type: string, value: string): {
    message: string
    hasError: boolean
} {
    switch (type) {
        case 'email':
            return validateEmail(value)
        case 'password':
            return validatePassword(value)
        default:
            return { 
                message: "",
                hasError: false
            }
    }
}


export const isBrowser = () => {
    if (typeof window === undefined) false
    return true
}



export const generateProdID = () => {
    return UUIDV4().substring(0,5)
}

export const joinDate = (month: string, day: string, year: string) => {
    return [month, day, year].join('-')
}

export const createExpiresFromDate = (month: string, day: string, year: string) => {
    const date = moment(joinDate(year, month, day), 'YYYY MM DD');
    return moment(date).format('MMM/DD/YYYY');
}

export const currentMonth = (moment().get('M') + 1).toString()
export const currentDay = moment().get('D').toString()
export const currentYear = moment().get('year').toString()