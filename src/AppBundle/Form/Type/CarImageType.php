<?php

namespace AppBundle\Form\Type;

use Symfony\Component\Form\AbstractType;

class CarImageType extends AbstractType
{
    public function getParent()
    {
        return 'text';
    }

    public function getName()
    {
        return 'car_image';
    }
}