import User from '../models/User';
import Role from '../models/Role'
import jwt from 'jsonwebtoken';

import config from '../config';

export const signUp = async ( req, res ) => {
    try {
        const { username, email, password, roles  } = req.body;
        const newUser = new User( {
            username,
            email,
            password: await User.hashPassword( password ),
        });

        if ( roles ) {
            const foundRoles = await Role.find( { name: { $in: roles } } )
            newUser.roles = foundRoles.map( role => role._id );
        } else {
            const role = await Role.findOne( { name: 'user' } );
            newUser.roles = [ role._id ]
        }

        const userSaved = await newUser.save();
        const token = jwt.sign( { id: userSaved._id }, config.SECRET, { expiresIn: '24hr' } );
        res.json({ token });
    } catch (error) {
        res.json({
            ok: false,
            error
        })
    }
};

export const signIn = async ( req, res ) => {
    const { email, password } = req.body;
    const userFound = await User.findOne( { email } ).populate( 'roles' );
    if ( !userFound ) return res.json( { message: 'User not found' } );

    const matchPassword = await User.comparePassword( password, userFound.password );

    if ( !matchPassword ) return res.status( 401 ).json( { token: null, message: 'Invalid Password' } );

    const token = jwt.sign( { id: userFound._id }, config.SECRET, { expiresIn: '24hr' } );

    res.json( { token } );
};