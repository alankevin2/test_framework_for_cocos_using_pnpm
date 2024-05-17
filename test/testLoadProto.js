import protobuf from 'protobufjs';

const example = protobuf.loadSync('protos/example.proto');

const PersonMessage = example.lookupType('Person');

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
   }

   toProtobuf() {
        this.personMessage = PersonMessage.create({
            age: this.age,
            name: this.name,
            hobbies: 'some hobbies'
        });
        return this.personMessage;
    }
    toEncode() {
        if (this.personMessage === undefined) {
            this.toProtobuf();
        }
        return this.personMessage.encode().finish();
    }
}

const a = new Person('Alice', 40);

console.log(a);
console.log(a.toProtobuf());
console.log(a.toEncode());
