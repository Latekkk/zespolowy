import {ObjectWithIdAndName} from '@/Models/ObjectWithIdAndName'

const isObjectInArray = (arr: ObjectWithIdAndName[], obj: ObjectWithIdAndName): boolean => {
    return arr.some(item => item.id === obj.id && item.name === obj.name);
}

export default isObjectInArray;
